# Hume AI Emotion Detection Webapp

This webapp streams microphone audio to the Hume AI API and displays real-time emotion predictions. It includes both a Next.js frontend and an Express.js backend that acts as a WebSocket proxy to handle the Hume API connection with proper authentication.

## Features

- **Real-time Audio Streaming**: Captures microphone input and streams it to Hume AI
- **Emotion Detection**: Displays predictions for vocal burst, speech prosody, and language emotions
- **Toggle Control**: Start/stop recording with a single button
- **Connection Status**: Visual indicators for WebSocket connection status
- **Error Handling**: Comprehensive error handling and user feedback

## Architecture

- **Frontend**: Next.js with React, TypeScript, and Tailwind CSS
- **Backend**: Express.js with WebSocket proxy to Hume API
- **WebSocket Proxy**: Handles authentication headers for Hume API connection

## Prerequisites

- Node.js (v16 or higher)
- A Hume AI API key (get one from [https://hume.ai](https://hume.ai))
- Microphone access in your browser

## Setup Instructions

### 1. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3001` and includes:

- REST API endpoints
- WebSocket proxy at `ws://localhost:3001/hume-proxy`

### 3. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Open the Webapp

Navigate to `http://localhost:3000` in your browser.

## Usage

1. **Enter API Key**: Input your Hume AI API key in the configuration section
2. **Grant Permissions**: Allow microphone access when prompted by your browser
3. **Start Recording**: Click the "Start Recording" button to begin streaming
4. **View Emotions**: Real-time emotion predictions will appear below the controls
5. **Stop Recording**: Click "Stop Recording" to end the stream

## API Configuration

The webapp uses three Hume AI models:

- **Vocal Burst**: Detects emotions from non-speech audio like laughter, sighs, etc.
- **Speech Prosody**: Analyzes emotional content from speech patterns
- **Language**: Processes emotional content from transcribed speech

## Technical Details

### WebSocket Flow

1. Frontend connects to backend WebSocket proxy
2. Backend authenticates with Hume API using the provided API key
3. Audio data is captured, converted to base64, and sent through the proxy
4. Hume API responses are forwarded back to the frontend

### Audio Processing

- Sample Rate: 16kHz
- Channels: Mono (1 channel)
- Format: WebM
- Streaming Interval: 1 second chunks
- Echo Cancellation: Enabled
- Noise Suppression: Enabled

## File Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Main webapp component
│   │   │   ├── layout.tsx        # App layout
│   │   │   └── globals.css       # Global styles
│   │   └── components/ui/        # UI components
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── hume-proxy.js         # WebSocket proxy for Hume API
│   │   ├── index.js              # Default routes
│   │   └── users.js              # User routes
│   ├── bin/www                   # Server entry point
│   ├── app.js                    # Express app configuration
│   └── package.json
└── README-WEBAPP.md              # This file
```

## Troubleshooting

### Common Issues

1. **Microphone Access Denied**

   - Ensure your browser has microphone permissions
   - Check browser settings for microphone access

2. **WebSocket Connection Failed**

   - Verify the backend is running on port 3001
   - Check browser console for connection errors

3. **Hume API Authentication Failed**

   - Verify your API key is correct
   - Check that your Hume AI account has sufficient credits

4. **No Emotion Predictions**
   - Ensure you're speaking clearly into the microphone
   - Check that audio is being captured (browser should show mic indicator)
   - Verify the WebSocket connection is established

### Debug Tips

- Open browser developer tools to view console logs
- Check the Network tab for WebSocket connection status
- Monitor the backend console for proxy connection logs

## Security Notes

- API keys are sent through a secure WebSocket connection
- The backend proxy prevents direct API key exposure to the client
- Audio data is processed in real-time and not stored

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (macOS/iOS)

## Performance

- Real-time processing with ~1 second latency
- Optimized for continuous streaming
- Automatic reconnection on connection loss
