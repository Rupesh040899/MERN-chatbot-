# Premium AI Chatbot Web Application

A modern, production-ready AI chatbot built with the MERN stack (MongoDB-ready but currently not integrated). Features a beautiful premium UI with glassmorphism design, smooth GSAP animations, and seamless AI provider integration.

## 🎯 Features

- **Premium UI/UX**: Dark theme with glassmorphism, gradients, and blur effects
- **Smooth Animations**: GSAP-powered animations for messages, sidebar, and interactions
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **AI Integration**: Modular AI service layer supporting OpenAI-compatible APIs and Grok
- **Real-time Chat**: Send/receive messages with typing indicators and loading states
- **Markdown Support**: Full markdown rendering with code syntax highlighting
- **Modern Stack**: React + Vite (frontend), Express.js (backend), Tailwind CSS, GSAP, Framer Motion

## 🏗️ Project Structure

```
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── animations/     # GSAP animation utilities
│   │   ├── services/       # API and AI services
│   │   ├── utils/          # Helper utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
├── server/                 # Express.js backend
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── services/           # Business logic & AI provider
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Helper functions
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env
├── README.md
└── .env.example
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or navigate to project**
```bash
cd "MERN Chatbot"
```

2. **Setup Frontend**
```bash
cd client
npm install
```

3. **Setup Backend**
```bash
cd ../server
npm install
```

### Environment Variables

Create `.env` files in both `client/` and `server/` directories:

**client/.env**
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
```

**server/.env**
```
PORT=5000
NODE_ENV=development
AI_PROVIDER=openai
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

**Terminal 1 - Frontend (from `client/` directory)**
```bash
npm run dev
```

**Terminal 2 - Backend (from `server/` directory)**
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`
Backend API at `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS
- **GSAP**: Advanced animations
- **Framer Motion**: Component animations
- **Axios**: HTTP client
- **Marked**: Markdown parser
- **Highlight.js**: Code syntax highlighting

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin requests
- **dotenv**: Environment variables
- **Axios**: HTTP client for AI API calls

### AI Integration
- **Modular Architecture**: Easily switch between AI providers
- **OpenAI Compatible**: Support for OpenAI, Grok, and compatible APIs
- **Streaming Ready**: Backend prepared for streaming responses

## 📝 API Documentation

### POST /api/chat

**Request:**
```json
{
  "message": "Hello, how can you help me?"
}
```

**Response:**
```json
{
  "reply": "AI response text here"
}
```

## 🎨 Design System

### Color Palette
- Primary: Blue gradients (`from-blue-600 to-purple-600`)
- Background: Dark (`#0f172a`)
- Glass: Semi-transparent white (`rgba(255, 255, 255, 0.1)`)
- Accent: Purple/Pink gradients

### Components
- **ChatMessage**: Animated message bubbles
- **ChatInput**: Glassmorphic input with focus effects
- **TypingIndicator**: Animated dots
- **Sidebar**: Smooth transitions and animations
- **MessageList**: Auto-scrolling with staggered animations

## 🎬 Animation Features

- Message entrance animations (fade + slide)
- Sidebar smooth transitions
- Typing indicator animation
- Floating background gradients
- Hover effects on buttons
- Input focus effects
- Staggered animation for message lists

## 🔄 AI Provider Integration

The backend uses a modular AI service layer that makes it easy to switch providers:

```javascript
// services/aiProvider.js handles all AI logic
// Support for OpenAI-compatible APIs
// Ready for Grok API integration
```

To switch providers, simply update `AI_PROVIDER` in `.env` and ensure the API key is set.

## 📦 Database Ready

Backend architecture is prepared for MongoDB integration without requiring code restructuring.

## 🚦 Future Enhancements

- [ ] MongoDB integration for chat history
- [ ] User authentication
- [ ] Real-time streaming responses
- [ ] Multiple conversation threads
- [ ] Export chat history
- [ ] Custom AI model fine-tuning
- [ ] Voice input/output
- [ ] Collaborative chats

## 📄 License

MIT License - feel free to use this for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

---

Built with ❤️ for premium AI experiences
