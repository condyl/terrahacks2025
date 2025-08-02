# 🎯 Setup Instructions for Hume AI Voice Chat

This project now uses **official Hume AI SDKs** for seamless voice emotion detection. Follow these steps to get it running:

## 🔑 **1. Get Your Hume AI Credentials**

1. **Sign up** at [https://platform.hume.ai/](https://platform.hume.ai/)
2. **Get your API Key** from the dashboard
3. **Generate a Secret Key** (required for access tokens)

## ⚙️ **2. Backend Setup**

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# backend/.env
HUME_API_KEY=your_api_key_here
HUME_SECRET_KEY=your_secret_key_here

# Optional: Custom EVI Configuration ID
HUME_CONFIG_ID=your_config_id_here
```

### Start Backend Server

```bash
cd backend
npm start
```

✅ Backend runs on `http://localhost:3001`

## 🌐 **3. Frontend Setup**

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Frontend Server

```bash
cd frontend
npm run dev
```

✅ Frontend runs on `http://localhost:3000`

## 🚀 **4. Quick Start Script**

Use the provided script to start both servers:

```bash
./start-servers.sh
```

## 🎤 **5. Usage**

1. **Open** `http://localhost:3000` in your browser
2. **Click "Start Call"** to begin voice session
3. **Speak** into your microphone
4. **Watch** real-time emotion analysis appear
5. **Use mute/unmute** to control your microphone
6. **Click "End Call"** to finish

## 🔧 **What Changed from Manual Implementation**

### ✅ **Before (Manual)**

- Custom WebSocket proxy
- Manual audio processing (Web Audio API)
- Raw PCM conversion and base64 encoding
- Manual authentication with API keys
- Complex error handling and reconnection logic

### ✅ **After (Official SDKs)**

- `@humeai/voice-react` handles everything
- Server-side access token generation
- Automatic audio processing and streaming
- Built-in connection management
- Professional UI components

## 🏗️ **Architecture**

```
Frontend (React)
├── VoiceProvider (Hume SDK)
├── useVoice() hooks
└── Real-time emotion display

Backend (Express)
├── Access token generation
├── Environment variable security
└── API endpoint for tokens
```

## 🔍 **Troubleshooting**

### Backend Issues

- **"Unable to get access token"**: Check your `HUME_API_KEY` and `HUME_SECRET_KEY`
- **"Missing environment variables"**: Create `.env` file in backend folder
- **Connection refused**: Make sure backend is running on port 3001

### Frontend Issues

- **"Failed to connect"**: Verify backend is running
- **Microphone not working**: Check browser permissions
- **No emotion data**: Speak clearly and ensure good audio input

### Browser Compatibility

- ✅ **Chrome/Edge**: Full support
- ✅ **Firefox**: Full support
- ✅ **Safari**: Full support

## 🔐 **Security Notes**

- ✅ **API keys** are kept server-side only
- ✅ **Access tokens** are generated securely
- ✅ **No sensitive data** exposed to browser
- ✅ **CORS** properly configured

## 📈 **Performance**

- **Real-time processing** with minimal latency
- **Automatic reconnection** on connection loss
- **Optimized audio streaming** via official SDKs
- **Professional-grade** voice processing

## 🎯 **Next Steps**

- **Custom EVI Configuration**: Create custom voice personalities
- **Advanced Models**: Use additional Hume models (face, language)
- **Chat History**: Implement conversation memory
- **UI Customization**: Enhance the interface design

---

## 🆘 **Need Help?**

- **Hume Documentation**: [https://docs.hume.ai/](https://docs.hume.ai/)
- **SDK Reference**: [https://github.com/HumeAI/hume-typescript-sdk](https://github.com/HumeAI/hume-typescript-sdk)
- **Example Projects**: [https://github.com/HumeAI/hume-api-examples](https://github.com/HumeAI/hume-api-examples)

---

✨ **Your Hume AI Voice Chat is now ready to detect emotions in real-time!** 🎤🎭
