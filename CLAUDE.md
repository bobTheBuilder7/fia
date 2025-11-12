# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Feminine Intelligence Agency (FIA)** - An AI-powered chat application for analyzing relationship patterns by comparing user stories with movie scripts. The app uses AI research agents with RAG (Retrieval Augmented Generation) backend capabilities.

## Development Commands

### Frontend (React)
```bash
npm run dev          # Start development server on http://[::]:8080
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint on all files
```

### Backend (Python)
```bash
# Setup (first time)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Configure your API keys

# Running the API server
python -m app.main        # Start FastAPI server on http://localhost:8000
# Or with auto-reload:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Data ingestion (after setting up .env)
python scripts/ingest_data.py --file data/your_data.json --clear

# Testing (independent of frontend)
# Visit http://localhost:8000/docs for Swagger UI
```

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives

### Backend (Python)
- **API Framework**: FastAPI 0.115.5
- **LLM Framework**: LangChain 1.0.5 (LTS)
- **Vector Database**: ChromaDB 0.5.23
- **LLM Provider**: OpenAI (GPT-4)
- **Embeddings**: OpenAI text-embedding-ada-002
- **Authentication**: Supabase (shared with frontend)

## Architecture

### Directory Structure

```
src/                           # Frontend React application
├── pages/                     # Route pages (Index, Auth, NotFound)
├── ui/                        # Custom UI components
├── hooks/                     # React hooks
├── lib/                       # Utility functions
├── integrations-supabase/     # Supabase client and types
└── App.tsx                    # Main app with routing and providers

backend/                       # Python RAG backend
├── app/
│   ├── main.py               # FastAPI application and endpoints
│   ├── config.py             # Configuration and environment variables
│   ├── models.py             # Pydantic models for API
│   ├── vector_store.py       # ChromaDB vector database wrapper
│   └── rag_chain.py          # LangChain RAG pipeline
├── data/                      # Data files
│   ├── *.json                # Notion exports with player typologies
│   └── chroma_db/            # ChromaDB persisted data (auto-generated)
├── scripts/
│   └── ingest_data.py        # Script to load data into vector DB
├── requirements.txt           # Python dependencies
└── .env.example              # Environment variables template
```

### Important Architectural Notes

**Component Import Pattern Issue**: The codebase has an inconsistency where UI components are located in `src/ui/` but are imported using the `@/components/` alias. Note the following:
- Components physically exist in: `src/ui/`
- Components are imported as: `@/components/ComponentName`
- The `components.json` config expects `@/components/ui` but this directory doesn't exist
- When creating new components, follow the existing pattern and place them in `src/ui/`

**Path Aliases**: The project uses `@/` as an alias for `src/` (configured in vite.config.ts and tsconfig.json).

### Key Application Flow

1. **Entry Point**: `src/main.tsx` → `src/App.tsx`
2. **Routing**: App.tsx sets up BrowserRouter with routes (/, /auth, /*)
3. **Main Chat Interface**: `src/pages/Index.tsx` orchestrates the chat UI:
   - Manages message state and chat history
   - Uses mock `analyzeStory()` function (placeholder for real API)
   - Coordinates ChatHeader, Sidebar, WelcomeScreen, ChatMessage, and ChatInput components

4. **Message Analysis**: Currently uses mock data returning relationship pattern analysis with findings categorized as "danger", "warning", or "info". This should be replaced with actual RAG backend calls.

### Supabase Integration

- Client initialized in `src/integrations-supabase/client.ts`
- Requires environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- Auth configured with localStorage persistence and auto-refresh
- Database schema defined in `src/integrations-supabase/types.ts` (currently empty)

### Message Structure

Messages include:
- `id`: Unique identifier
- `role`: "user" | "assistant"
- `content`: Message text
- `analysis` (optional): Object containing findings array with type, title, and description

## TypeScript Configuration

The project has relaxed TypeScript settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

When adding new code, consider tightening these rules for better type safety.

## Development Notes

### Adding New Routes
Add custom routes in `src/App.tsx` ABOVE the catch-all `*` route (see comment on line 21).

### Working with shadcn/ui
The project uses shadcn/ui components. Configuration is in `components.json`. When adding new shadcn components, they should be placed in the appropriate location following the existing import pattern.

### Styling Approach
- Uses Tailwind CSS with custom HSL color variables
- Dark mode support via class strategy
- Custom animations and design tokens in tailwind.config.ts
- shadcn/ui component theming via CSS variables in src/index.css

## Backend RAG System

### Architecture Overview

The backend implements a RAG (Retrieval Augmented Generation) system to analyze relationship stories for manipulation patterns:

1. **Data Layer**: Manipulation pattern data from Notion (player typologies, tactics, red flags)
2. **Vector Store**: ChromaDB stores embeddings of patterns for semantic search
3. **RAG Pipeline**: LangChain orchestrates retrieval + generation with GPT-4
4. **API Layer**: FastAPI exposes REST endpoints for the frontend

### How the RAG System Works

```
User Query → Vector Search (ChromaDB) → Retrieve Top K Patterns →
→ Build Context Prompt → GPT-4 Analysis → Structured Response
```

**Example Flow**:
1. User describes: "My partner always needs to be right and criticizes me"
2. Vector search finds: "Mr. Always Right", "The Critic", similar patterns
3. GPT-4 analyzes with context of those specific patterns
4. Returns structured findings with severity levels (danger/warning/info)

### API Endpoints

- `GET /` - Root endpoint (health check)
- `GET /health` - Detailed health check (checks vector DB initialization)
- `POST /analyze` - Main endpoint: analyze relationship story
- `GET /patterns` - List all manipulation patterns in database (debug)

### Environment Variables Required

```bash
# Backend .env file
OPENAI_API_KEY=sk-...                    # Required
CHROMA_PERSIST_DIRECTORY=./data/chroma_db
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:8080,http://[::]:8080
```

### Data Format

The backend expects JSON/CSV files with manipulation pattern data containing:
- `player_type` or `Player Type`: Name of the pattern (e.g., "Mr. Always Right")
- `description` or `Description`: Detailed explanation
- `core_tactics` or `Core Tactics`: Main manipulation tactics
- `red_flags` or `Red Flags`: Warning signs
- `opposites` or `Opposites`: Contrasting behaviors (optional)
- `notion_url`: Link to original Notion page (optional)

**Note**: The user is currently extracting extensive player typology data from Notion that will be placed in `backend/data/` as JSON files.

### Testing the Backend Independently

1. **Start the server**: `uvicorn app.main:app --reload`
2. **Visit Swagger UI**: http://localhost:8000/docs
3. **Test the `/analyze` endpoint** directly in the browser
4. **Check patterns loaded**: http://localhost:8000/patterns

### Integration Points

The frontend's mock `analyzeStory()` function in `src/pages/Index.tsx` (line 34-71) should be replaced with a fetch call to `POST http://localhost:8000/analyze`.

### Key TODOs in Codebase

**Backend**:
- [ ] Complete data ingestion script (`scripts/ingest_data.py`)
- [ ] Ingest player typology data once extracted from Notion
- [ ] Test RAG pipeline with real queries
- [ ] Add structured output parsing for better findings extraction
- [ ] Consider adding movie script data in future phase

**Frontend**:
- [ ] Replace mock `analyzeStory()` function with API calls to backend
- [ ] Add loading states for API calls
- [ ] Handle API errors gracefully
- [ ] Implement actual Supabase authentication
- [ ] Implement chat persistence (store in Supabase)
