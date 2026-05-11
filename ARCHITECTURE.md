# Architecture Documentation

## System Overview

The Premium AI Chatbot is built with a modern, scalable MERN-style architecture. The system follows a layered approach with clear separation of concerns.

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
                          │ (HTTP/Axios)
                          │
          ┌───────────────▼───────────────┐
          │    API Gateway (Port 5000)    │
          └───────────────┬───────────────┘
          
┌─────────────────────────────────────────────────────────────┐
│                  SERVER (Express.js)                        │
│  ┌─────────────┐  ┌──────────┐  ┌──────────────┐           │
│  │   Routes    │  │Controllers│  │ Middleware   │           │
│  └─────────────┘  └──────────┘  └──────────────┘           │
│         │               │               │                   │
│         └───────────────┼───────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   Services (aiProvider)       │                   │
│         │   Utils (validation)          │                   │
│         └───────────────┬───────────────┘                   │
│                         │                                   │
│         ┌───────────────▼───────────────┐                   │
│         │   AI Providers                │                   │
│         │   - OpenAI API                │                   │
│         │   - Grok API (ready)          │                   │
│         └───────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture (React + Vite)

### Directory Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx       - Message bubble component
│   │   ├── ChatInput.jsx         - Input field component
│   │   ├── TypingIndicator.jsx   - Loading indicator
│   │   ├── Sidebar.jsx           - Navigation sidebar
│   │   ├── MessageList.jsx       - Messages container
│   │   └── BackgroundGradient.jsx - Background animation
│   ├── pages/
│   │   └── ChatPage.jsx          - Main page layout
│   ├── hooks/
│   │   ├── useChat.js            - Chat logic hook
│   │   └── useAutoScroll.js      - Auto-scroll hook
│   ├── services/
│   │   └── chatService.js        - API client
│   ├── animations/
│   │   └── gsapAnimations.js     - GSAP utilities
│   ├── utils/
│   │   └── helpers.js            - Helper functions
│   ├── App.jsx
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
- Manages message flow

#### 2. **MessageList** (Presentational)
- Displays messages array
- Auto-scrolls to latest message
- Shows typing indicator when loading
- Handles message animations

#### 3. **ChatMessage** (Presentational)
- Renders individual message
- Supports markdown rendering
- Displays code syntax highlighting
- Includes copy button

#### 4. **ChatInput** (Controlled Component)
- Handles user input
- Textarea auto-grow
- Send button logic
- Keyboard shortcuts (Shift+Enter)

#### 5. **Sidebar** (Modal)
- Mobile-friendly navigation
- New chat button
- Chat history placeholder
- Settings & help links

#### 6. **TypingIndicator** (Presentational)
- Animated dots
- Shows during AI response

#### 7. **BackgroundGradient** (Decoration)
- Fixed floating gradients
- Grid overlay
- Animated blobs

### State Management

Uses React hooks for lightweight state management:
- `useChat()` - Message state & logic
- `useState()` - Component UI state
- `useRef()` - DOM references
- `useEffect()` - Side effects

### Data Flow

```
User Input → ChatInput → onSend() → useChat hook
                                       ↓
                                  sendMessage()
                                       ↓
                                  chatService.js
                                       ↓
                                    API Call
                                       ↓
                                  Response
                                       ↓
                                  Update messages
                                       ↓
                                  MessageList re-render
```

## Backend Architecture (Express.js)

### Directory Structure
```
server/
├── routes/
│   └── chatRoutes.js      - API routes definition
├── controllers/
│   └── chatController.js  - Route handlers
├── services/
│   └── aiProvider.js      - AI provider logic
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
Request
   ↓
CORS Middleware
   ↓
Request Logger Middleware
   ↓
Route Handler (chatRoutes.js)
   ↓
Controller (chatController.js)
   │
   ├── Validate input
   │   ↓
   ├── Generate response (aiProvider.js)
   │   │
   │   └── Call AI API (OpenAI/Grok)
   │
   └── Return response
   ↓
Error Handler Middleware
   ↓
Response
```

### AI Provider Service

The `aiProvider.js` implements a plugin architecture:

```javascript
// Structure
const provider = {
  name: 'provider-name',
  isConfigured: () => boolean,
  generateResponse: async (message) => string
};

// Multiple providers stored in object
const providers = {
  openai: openaiProvider,
  grok: grokProvider,
};

// Runtime provider selection
const activeProvider = providers[process.env.AI_PROVIDER];
```

**Benefits:**
- Easy to add new providers
- No code changes needed to switch providers
- Each provider is independent
- Fallback handling built-in

### Error Handling Strategy

```
API Call → Try/Catch
           ↓
           ├─ Success → Format & Return
           ├─ 401 → Unauthorized
           ├─ 429 → Rate Limited
           ├─ 503 → Service Unavailable
           └─ Other → Generic Error Message
```

## Data Models

### Message Object
```javascript
{
  id: string,           // Timestamp-based ID
  text: string,         // Message content
  sender: string,       // 'user' | 'ai' | 'error'
  timestamp: Date       // Message time
}
```

### Chat Response
```javascript
{
  success: boolean,
  message: string,      // User's original message
  reply: string,        // AI response
  timestamp: string     // ISO timestamp
}
```

## API Endpoints

### POST /api/chat
```
Request:
{
  message: "User message"
}

Response:
{
  success: true,
  message: "User message",
  reply: "AI response",
  timestamp: "2024-05-11T..."
}

Error:
{
  error: "Error Type",
  message: "Error description"
}
```

### GET /health
```
Response:
{
  status: "ok",
  timestamp: "2024-05-11T...",
  uptime: 123.45
}
```

## Animation Strategy

### GSAP Animations
- **Message entrance**: Slide + fade from left
- **Sidebar**: Smooth slide from left with overlay
- **Input focus**: Glow effect
- **Typing indicator**: Pulsing dots
- **Background**: Floating gradient loops

### Performance Considerations
- Use GPU acceleration (transform, opacity)
- Avoid animating layout properties
- Kill animations on component unmount
- Use GSAP timeline for complex sequences

## Styling System

### Tailwind CSS
- Utility-first approach
- Custom dark theme
- Glassmorphism effects
- Custom animations in config

### CSS Variables & Custom Properties
```css
/* Theme colors */
--primary: #3b82f6
--secondary: #a855f7
--dark: #0f172a
```

## Security Implementation

### Input Validation
- Message length validation (1-4000 chars)
- Type checking
- XSS protection via React

### API Security
- CORS enabled with whitelist
- Environment variables for secrets
- Request validation on backend
- Error message sanitization

### Best Practices
- No sensitive data in logs
- API keys never exposed to frontend
- HTTPS enforced in production
- Rate limiting ready for implementation

## Scalability Considerations

### Frontend Scaling
- Component composition
- Lazy loading ready
- Service worker compatible
- PWA potential

### Backend Scaling
- Stateless design
- Horizontal scalability ready
- Database abstraction (no DB yet)
- Middleware pipeline extensible

### Deployment Ready
- Environment-based configuration
- Docker-compatible structure
- Error tracking ready
- Monitoring hooks in place

## Future Integration Points

### Database Integration
```javascript
// Ready for MongoDB
// Example schema structure:
{
  conversations: [
    {
      id: ObjectId,
      userId: string,
      messages: [Message],
      createdAt: Date,
      updatedAt: Date
    }
  ]
}
```

### Authentication
```javascript
// JWT middleware ready
// Can add:
// - User registration
// - Login/logout
// - Protected routes
// - Token refresh
```

### Real-time Communication
```javascript
// WebSocket ready architecture
// Can implement:
// - Streaming responses
// - Live typing indicators
// - Push notifications
// - Multi-user support
```

### Analytics
```javascript
// Logging infrastructure ready
// Can add:
// - User behavior tracking
// - API performance metrics
// - Error analytics
// - Usage statistics
```

## Performance Metrics

### Frontend
- Bundle size: ~500KB (before gzip)
- Time to interactive: <2s
- Lighthouse score target: >90

### Backend
- Response time: <500ms (with AI)
- Memory usage: <100MB
- Concurrent users: Dependent on AI API limits

## Testing Strategy

### Unit Tests
```
/tests/unit/
├── components/
├── hooks/
└── services/
```

### Integration Tests
```
/tests/integration/
├── api/
└── workflows/
```

### E2E Tests
```
/tests/e2e/
├── chat-flow.test.js
└── error-handling.test.js
```

## Development Workflow

### Local Development
1. Frontend on port 5173
2. Backend on port 5000
3. Hot reload enabled
4. Console logging active

### Code Organization
- Functional components only
- Custom hooks for logic
- Services for API calls
- Utils for helpers
- Separation of concerns

### Version Control
- .env files not committed
- node_modules ignored
- Production builds not committed
- Clean commit history

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Frontend built (`npm run build`)
- [ ] Backend tested
- [ ] CORS origin configured
- [ ] Error tracking enabled
- [ ] Logging configured
- [ ] Database (if added) migrated
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting enabled

---

This architecture provides a solid foundation for a production-ready AI chatbot with room for growth and additional features.
