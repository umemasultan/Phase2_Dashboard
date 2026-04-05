#!/bin/bash

# Start backend server in background
cd /app/backend
python start_server.py &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to start..."
sleep 5

# Start frontend server
cd /app/frontend
NEXT_PUBLIC_API_URL=http://localhost:8000 npm start -- -p 7860 &
FRONTEND_PID=$!

# Function to handle shutdown
cleanup() {
    echo "Shutting down services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGTERM SIGINT

# Wait for both processes
wait
