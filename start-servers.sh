#!/bin/bash

# Kill any existing processes on the ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo "🚀 Starting backend server..."
cd backend && npm start &
BACKEND_PID=$!

echo "⏱️  Waiting for backend to start..."
sleep 3

echo "🌐 Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "✅ Servers started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "📍 URLs:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo "WebSocket Test: file://$PWD/test-websocket.html"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    wait
    echo "✅ Cleanup complete"
}

# Set up trap to catch Ctrl+C
trap cleanup EXIT

# Wait for user to press Ctrl+C
wait