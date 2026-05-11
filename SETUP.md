# Setup Instructions for Premium AI Chatbot

This guide will help you set up and run the Premium AI Chatbot application.

## 📋 Prerequisites

Make sure you have installed:
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)
- **Git** (optional, for version control)

## 🔑 Get API Keys

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API keys section
4. Create a new secret key
5. Copy and save it securely

### Grok API Key (Optional)
1. Go to [X AI](https://x.ai/)
2. Follow their API documentation
3. Generate API key
4. Save it for later use

## 🚀 Installation & Setup

### Step 1: Clone/Download Project

```bash
# Navigate to project directory
cd "MERN Chatbot"
```

### Step 2: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file (if not exists)
copy .env .env.local  # Windows
# or
cp .env .env.local    # Mac/Linux

# Edit .env with your API keys
# IMPORTANT: Add your OpenAI API key
```

**server/.env Configuration:**
```
PORT=5000
NODE_ENV=development
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-4
OPENAI_API_URL=https://api.openai.com/v1

# CORS - should match frontend URL
CORS_ORIGIN=http://localhost:5173

LOG_LEVEL=info
```

### Step 3: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# .env is already configured but verify:
# VITE_API_URL=http://localhost:5000
# VITE_API_TIMEOUT=30000
```

## ▶️ Running the Application

### Terminal 1: Start Backend Server

```bash
cd server
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║         🚀 Premium AI Chatbot Server Started               ║
║  Server: http://localhost:5000                             ║
║  Environment: development                                  ║
║  AI Provider: openai                                       ║
║  CORS Origin: http://localhost:5173                        ║
╚════════════════════════════════════════════════════════════╝
```

### Terminal 2: Start Frontend Development Server

```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open in Browser

Visit: **http://localhost:5173/**

## ✅ Verify Setup

1. Frontend loads with chat interface
2. Type a message and click send
3. You should receive an AI response
4. Check browser console for errors (F12)
5. Check terminal for server logs

## 🔧 Troubleshooting

### Port Already in Use

**Backend (Port 5000):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Kill the process or use different port
set PORT=5001  # Windows
export PORT=5001  # Mac/Linux
```

**Frontend (Port 5173):**
Vite will automatically use next available port.

### API Connection Error

1. Verify backend is running (check Terminal 1)
2. Check CORS_ORIGIN matches frontend URL
3. Verify .env file has OPENAI_API_KEY set
4. Clear browser cache (Ctrl+Shift+Delete)

### OpenAI API Error

```
Error: OpenAI API Error: invalid_request_error
```

Solutions:
- Verify API key is correct (starts with `sk-`)
- Check account has available credits
- Ensure API key has chat permissions
- Try different model: `gpt-3.5-turbo` instead of `gpt-4`

### Module Not Found Error

```bash
# Reinstall dependencies
cd server && rm -rf node_modules && npm install
cd ../client && rm -rf node_modules && npm install
```

## 📦 Production Build

### Build Frontend

```bash
cd client
npm run build

# Output in client/dist/
# Ready to deploy to web server
```

### Build Backend

Backend doesn't need building (Node.js runs directly).

### Production Environment

**server/.env**
```
NODE_ENV=production
AI_PROVIDER=openai
OPENAI_API_KEY=your-production-key
CORS_ORIGIN=https://your-domain.com
PORT=5000
```

**Run Production:**
```bash
cd server
npm start
```

## 🔒 Security Checklist

- [ ] API keys never committed to git (.env in .gitignore)
- [ ] CORS_ORIGIN set to actual domain in production
- [ ] Using HTTPS in production
- [ ] API keys rotated regularly
- [ ] Input validation enabled
- [ ] Error messages don't expose sensitive data
- [ ] Rate limiting considered for production

## 📊 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/        - React components
│   │   ├── pages/             - Page components
│   │   ├── hooks/             - Custom hooks
│   │   ├── services/          - API services
│   │   ├── animations/        - GSAP animations
│   │   └── utils/             - Utilities
│   └── package.json
├── server/
│   ├── routes/                - API routes
│   ├── controllers/           - Route handlers
│   ├── services/              - Business logic
│   ├── middleware/            - Express middleware
│   ├── utils/                 - Utilities
│   └── package.json
└── README.md
```

## 🎨 Customization

### Change API Provider

Edit `server/.env`:
```bash
AI_PROVIDER=grok  # Switch to Grok
```

### Change Port

Edit `server/.env`:
```bash
PORT=3000  # Use different port
```

### Change Frontend URL in Production

Edit `client/.env`:
```bash
VITE_API_URL=https://api.your-domain.com
```

## 📚 Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start with auto-reload
- `npm start` - Start production
- `npm run lint` - Run ESLint

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or kill process using port |
| API 401 Unauthorized | Check OPENAI_API_KEY is correct |
| CORS error | Verify CORS_ORIGIN matches frontend URL |
| Module not found | Run `npm install` in appropriate directory |
| Blank page | Check browser console for errors |
| No response from AI | Check internet connection and API status |

## 🆘 Getting Help

1. **Check Console Errors:**
   - Browser: F12 → Console tab
   - Server: Check terminal output

2. **Verify Configuration:**
   - Check .env files exist in both directories
   - Verify API keys are correct
   - Ensure all ports are available

3. **Test API Directly:**
   ```bash
   curl -X POST http://localhost:5000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"Hello"}'
   ```

## ✨ Next Steps

After successful setup:
1. Explore the UI and test chat functionality
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
4. Review components to understand code structure

## 📝 Notes

- No MongoDB is integrated (ready for future integration)
- All animations use GSAP for performance
- Fully responsive design
- Markdown support for AI responses
- Easy provider switching (OpenAI, Grok)

---

**Need Help?** Check the console output and error messages for clues. Most issues are configuration-related.

Good luck! 🚀
