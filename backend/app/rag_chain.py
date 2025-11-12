from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from app.config import settings
from app.vector_store import vector_store
from app.models import AnalysisResult, Finding


class RAGChain:
    """RAG chain for analyzing relationship stories and detecting manipulation patterns."""

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o",
            temperature=0.3,
            openai_api_key=settings.openai_api_key
        )

        # System prompt for analyzing relationship dynamics
        self.system_prompt = """You are a compassionate AI assistant specializing in identifying manipulation patterns in relationships.

Your role is to:
1. Analyze the user's relationship story with empathy and care
2. Identify manipulation patterns based on the provided context
3. Provide clear, actionable insights
4. Always prioritize the user's safety and wellbeing

Context from manipulation pattern database:
{context}

IMPORTANT GUIDELINES:
- Be empathetic and supportive in tone
- Cite specific patterns from the database when making observations
- Classify findings as "danger" (serious red flags), "warning" (concerning behaviors), or "info" (general observations)
- Always remind users they're not alone and help is available
- Avoid victim-blaming language
- Focus on patterns and behaviors, not judgment of the person

User's story: {question}

Provide a thoughtful analysis that includes:
1. A warm, understanding opening
2. Specific manipulation patterns detected (reference the exact pattern names from context)
3. Clear explanations of why these patterns are concerning
4. Validation of the user's experience
5. Gentle encouragement toward support resources if needed"""

        self.prompt = ChatPromptTemplate.from_template(self.system_prompt)

    def format_docs(self, docs) -> str:
        """Format retrieved documents for context."""
        formatted = []
        for doc in docs:
            formatted.append(f"Pattern: {doc.metadata.get('player_type', 'Unknown')}")
            formatted.append(f"Description: {doc.page_content}")
            formatted.append(f"Tactics: {doc.metadata.get('core_tactics', 'N/A')}")
            formatted.append(f"Red Flags: {doc.metadata.get('red_flags', 'N/A')}")
            formatted.append("---")
        return "\n".join(formatted)

    def analyze_story(self, user_message: str) -> Dict[str, Any]:
        """
        Analyze user's relationship story using RAG.

        Returns both the raw LLM response and retrieved patterns.
        """
        # Get retriever
        retriever = vector_store.get_retriever(search_kwargs={"k": 5})

        # Build RAG chain
        rag_chain = (
            {
                "context": retriever | self.format_docs,
                "question": RunnablePassthrough()
            }
            | self.prompt
            | self.llm
            | StrOutputParser()
        )

        # Get response
        response = rag_chain.invoke(user_message)

        # Get retrieved documents for metadata
        retrieved_docs = retriever.invoke(user_message)
        patterns_detected = [doc.metadata.get('player_type', 'Unknown') for doc in retrieved_docs]

        return {
            "response": response,
            "retrieved_docs": retrieved_docs,
            "patterns_detected": list(set(patterns_detected))  # Remove duplicates
        }

    def parse_response_to_findings(self, llm_response: str, patterns: List[str]) -> List[Finding]:
        """
        Parse LLM response into structured findings.
        This is a simple implementation - you may want to enhance this with
        structured output from the LLM using function calling.
        """
        findings = []

        # Simple heuristic: look for danger/warning keywords
        # In production, you'd want the LLM to output structured JSON
        lines = llm_response.split('\n')

        for pattern in patterns:
            if pattern.lower() in llm_response.lower():
                # Determine severity based on keywords
                severity = "info"
                if any(word in llm_response.lower() for word in ["dangerous", "serious", "urgent", "abuse"]):
                    severity = "danger"
                elif any(word in llm_response.lower() for word in ["concerning", "warning", "red flag"]):
                    severity = "warning"

                findings.append(Finding(
                    type=severity,
                    title=f"Pattern Detected: {pattern}",
                    description=f"This behavior pattern matches known manipulation tactics.",
                    matched_pattern=pattern
                ))

        return findings

    def get_analysis(self, user_message: str) -> AnalysisResult:
        """
        Main method to get complete analysis result.
        """
        result = self.analyze_story(user_message)

        # Parse findings from response
        findings = self.parse_response_to_findings(
            result["response"],
            result["patterns_detected"]
        )

        return AnalysisResult(
            content=result["response"],
            findings=findings,
            patterns_detected=result["patterns_detected"],
            confidence_score=None  # Can implement confidence scoring later
        )


# Global RAG chain instance
rag_chain = RAGChain()
