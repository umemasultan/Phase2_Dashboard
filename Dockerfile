




# Multi-stage Dockerfile for Hugging Face Spaces
FROM node:18-slim AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Python backend stage
FROM python:3.11-slim

# Install Node.js for serving frontend
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend files
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/ ./backend/

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/next.config.js ./frontend/ 2>/dev/null || true

# Install frontend production dependencies
WORKDIR /app/frontend
RUN npm ci --only=production

WORKDIR /app

# Create startup script
RUN echo '#!/bin/bash\n\
cd /app/backend && python start_server.py &\n\
cd /app/frontend && npm start -- -p 7860\n\
wait' > /app/start.sh && chmod +x /app/start.sh

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

CMD ["/app/start.sh"]
