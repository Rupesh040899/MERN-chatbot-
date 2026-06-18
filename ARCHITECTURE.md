# Architecture Documentation

## System Overview

The Rupex AI Chatbot is built with a modern MERN-style architecture. The system follows a layered approach with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                   │
│  ┌─────────────┐  ┌──────────┐  ┌──────────────┐           │
│  │ Components  │  │  Hooks   │  │  Animations  │           │
│  └─────────────┘  └──────────┘  └──────────────┘           │
│         │               │               │                   │
│         └───────────────┼───────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │     Pages (ChatPage)          │                   │
│         └───────────────┬───────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   Services (chatService)      │                   │
│         │   Utils (helpers)             │                   │
│         └───────────────┬───────────────┘                   │
└─────────────────────────┼──────────────────────────────────┘
                          │ HTTP/Axios (message + history)
                          │
          ┌───────────────▼───────────────┐
          │    API Gateway (Port 5000)    │
          └───────────────┬───────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  SERVER (Express.js)                        │
│  ┌─────────────┐  ┌──────────┐  ┌──────────────┐           │
│  │   Routes    │  │Controllers│  │ Middleware   │           │
│  └─────────────┘  └──────────┘  └──────────────┘           │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   Services (aiProvider)       │                   │
│         └───────────────┬───────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   AI Providers                │                   │
│         │   - Groq (llama-3.3-70b)      │ ← Active          │
│         │   - OpenAI (gpt-4o-mini)      │                   │
│         │   - Gemini (2.0-flash-lite)   │                   │
│         │   - Grok (X.AI)               │                   │
│         └───────────────────────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   MongoDB Atlas               │                   │
│         │   Database: CHATBOTDATA       │                   │
│         │   Collection: chats           │                   │
│         └───────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture (React + Vite)

### Directory Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx        - Message bubble component
│   │   ├── ChatInput.jsx          - Input field component
│   │   ├── TypingIndicator.jsx    - Loading indicator
│   │   ├── Sidebar.jsx            - Navigation sidebar
│   │   ├── MessageList.jsx        - Messages container
│   │   └── BackgroundGradient.jsx - Background animation
│   ├── pages/
│   │   └── ChatPage.jsx           - Main page layout
│   ├── hooks/
│   │   ├── useChat.js             - Chat logic + conversation history
│   │   └── useAutoScroll.js       - Auto-scroll hook
│   ├── services/
│   │   └── chatService.js         - API client (sends message + history)
│   ├── animations/
│   │   └── gsapAnimations.js      - GSAP utilities
│   ├── utils/
│   │   └── helpers.js             - Helper functions
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

### Component Architecture

#### 1. **ChatPage** (Container Component)
- Manages overall chat state
- Handles sidebar visibility
- Coordinates between components

#### 2. **MessageList** (Presentational)
- Displays messages array
- Auto-scrolls to latest message
- Shows typing indicator when loading

#### 3. **ChatMessage** (Presentational)
- Renders individual message
- Supports markdown rendering
- Code syntax highlighting
- Copy button

#### 4. **ChatInput** (Controlled Component)
- Handles user input
- Textarea auto-grow
- Keyboard shortcuts (Shift+Enter for newline)

#### 5. **Sidebar** (Modal)
- Mobile-friendly navigation
- New chat button

#### 6. **TypingIndicator** (Presentational)
- Animated dots during AI response

#### 7. **BackgroundGradient** (Decoration)
- Fixed floating gradient blobs

### Conversation History Flow

```
User types message
       ↓
useChat.sendMessage(userMessage)
       ↓
chatService.sendChatMessage(message, messages)
       ↓
Format history: [{role: 'user'|'assistant', content: '...'}]
       ↓
POST /api/chat  { message, history[] }
       ↓
AI receives full context → context-aware reply
       ↓
messages state updated → re-render
```

### State Management

- `useChat()` — message state, history, loading, error
- `useState()` — component UI state
- `useRef()` — DOM references
- `useEffect()` — side effects

## Backend Architecture (Express.js)

### Directory Structure
```
server/
├── config/
│   └── db.js              - MongoDB Atlas connection
├── models/
│   └── Chat.js            - Mongoose Chat schema
├── routes/
│   └── chatRoutes.js      - API route definitions
├── controllers/
│   └── chatController.js  - Route handlers + DB save
├── services/
│   └── aiProvider.js      - Multi-provider AI logic
├── middleware/
│   ├── errorHandler.js    - Error handling
│   └── requestLogger.js   - Request logging
├── utils/
│   ├── validation.js      - Input validation
│   └── apiResponse.js     - Response formatting
├── server.js              - App entry point
├── package.json
└── .env
```

### Request/Response Flow

```
Request { message, history[] }
   ↓
CORS Middleware
   ↓
Request Logger
   ↓
chatRoutes.js → chatController.js
   ↓
Validate input
   ↓
generateAIResponse(message, history)
   ↓
aiProvider → Groq/OpenAI/Gemini API
   ↓
Save { message, reply, provider } → MongoDB Atlas
   ↓
Return { success, message, reply, timestamp }
```

### AI Provider Service

Plugin architecture — switch providers via `.env` with no code changes:

```javascript
const providers = {
  groq:   groqProvider,    // llama-3.3-70b-versatile (active)
  openai: openaiProvider,  // gpt-4o-mini
  gemini: geminiProvider,  // gemini-2.0-flash-lite
  grok:   grokProvider,    // X.AI grok-1
};

// Each provider signature:
{
  name: string,
  isConfigured: () => boolean,
  generateResponse: async (message, history[]) => string
}
```

All providers receive the full conversation history and include it in their messages array, enabling context-aware responses.

## Database (MongoDB Atlas)

### Connection
- Cluster: `cluster0.i2cz6zs.mongodb.net`
- Database: `CHATBOTDATA`
- Connection managed via Mongoose in `server/config/db.js`

### Chat Schema (`server/models/Chat.js`)
```javascript
{
  message:   String,   // User's message
  reply:     String,   // AI response
  provider:  String,   // Which AI provider was used
  timestamp: Date      // Auto-set on creation
}
```

Every message sent through the chatbot is automatically persisted to MongoDB Atlas.

## API Endpoints

### POST /api/chat
```
Request:
{
  "message": "User message",
  "history": [
    { "role": "user",      "content": "previous question" },
    { "role": "assistant", "content": "previous answer" }
  ]
}

Response:
{
  "success": true,
  "message": "User message",
  "reply": "AI response",
  "timestamp": "2026-06-18T..."
}
```

### GET /health
```
Response:
{
  "status": "ok",
  "timestamp": "2026-06-18T...",
  "uptime": 123.45
}
```

## Data Models

### Frontend Message Object
```javascript
{
  id:        string,   // Timestamp-based ID
  text:      string,   // Message content
  sender:    string,   // 'user' | 'ai' | 'error'
  timestamp: Date
}
```

### MongoDB Chat Document
```javascript
{
  _id:       ObjectId,
  message:   string,
  reply:     string,
  provider:  string,   // 'groq' | 'openai' | 'gemini' | 'grok'
  timestamp: Date
}
```

## Animation Strategy

### GSAP Animations
- **Message entrance**: Slide + fade from left/right
- **Sidebar**: Smooth slide with overlay
- **Input focus**: Glow effect
- **Typing indicator**: Pulsing dots
- **Background**: Floating gradient loops

## Styling System

### Tailwind CSS
- Utility-first dark theme
- Glassmorphism effects (`backdrop-filter: blur`)
- Custom animations

## Security Implementation

### Input Validation
- Message length: 1–4000 characters
- Type checking on all inputs
- XSS protection via React

### API Security
- CORS whitelist (`CORS_ORIGIN` env var)
- All secrets in `.env` (never committed)
- Request validation on backend
- Sanitized error messages

## Environment Configuration

### `server/.env`
```
PORT=5000
NODE_ENV=development
AI_PROVIDER=groq

GROQ_API_KEY=...
GROQ_MODEL=llama-3.3-70b-versatile

OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini

GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.0-flash-lite

MONGODB_URI=mongodb+srv://...

CORS_ORIGIN=http://localhost:5173
```

### `client/.env`
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
```

## Development Workflow

### Local Development
1. Backend: `cd server && npm run dev` → Port 5000
2. Frontend: `cd client && npm run dev` → Port 5173
3. Hot reload on both via `node --watch` and Vite HMR

### Version Control
- `.env` files not committed (gitignored)
- `node_modules` ignored
- Production builds not committed

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Frontend built (`npm run build`)
- [ ] CORS origin set to production domain
- [ ] MongoDB Atlas IP whitelist updated
- [ ] HTTPS enabled
- [ ] Rate limiting enabled

---

Built with React + Vite (frontend), Express.js (backend), MongoDB Atlas (database), and Groq LLaMA 3.3 70B (AI).
