from pydantic import BaseModel, Field
from typing import List, Optional, Literal


class ManipulationPattern(BaseModel):
    """Data model for manipulation player types."""

    player_type: str = Field(..., description="Name of the manipulation pattern (e.g., 'Mr. Always Right')")
    description: str = Field(..., description="Detailed description of the pattern")
    core_tactics: List[str] = Field(default_factory=list, description="Main manipulation tactics used")
    red_flags: List[str] = Field(default_factory=list, description="Warning signs to watch for")
    opposites: List[str] = Field(default_factory=list, description="Behaviors that contrast with this pattern")
    examples: List[str] = Field(default_factory=list, description="Examples or scenarios")
    notion_url: Optional[str] = Field(None, description="Original Notion page URL")


class ChatMessage(BaseModel):
    """Chat message from user."""

    content: str = Field(..., description="User's message/question")


class Finding(BaseModel):
    """Individual analysis finding."""

    type: Literal["danger", "warning", "info"] = Field(..., description="Severity level of finding")
    title: str = Field(..., description="Short title of the finding")
    description: str = Field(..., description="Detailed explanation")
    matched_pattern: Optional[str] = Field(None, description="Name of matched manipulation pattern")


class AnalysisResult(BaseModel):
    """Result of analyzing user's relationship story."""

    content: str = Field(..., description="Main response text")
    findings: List[Finding] = Field(default_factory=list, description="Specific findings from analysis")
    patterns_detected: List[str] = Field(default_factory=list, description="List of manipulation patterns detected")
    confidence_score: Optional[float] = Field(None, ge=0.0, le=1.0, description="Confidence in analysis (0-1)")


class HealthResponse(BaseModel):
    """Health check response."""

    status: str
    message: str
