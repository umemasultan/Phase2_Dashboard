# Backend-only Dockerfile for Hugging Face Spaces
FROM python:3.11-slim

WORKDIR /app

# Copy backend files
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

# Create .env file with default values
RUN echo "DATABASE_URL=sqlite:///./taskmanager.db" > .env && \
    echo "SECRET_KEY=your-secret-key-change-in-production-huggingface" >> .env && \
    echo "BETTER_AUTH_SECRET=your-auth-secret-change-in-production-huggingface" >> .env && \
    echo "ALGORITHM=HS256" >> .env && \
    echo "ACCESS_TOKEN_EXPIRE_DAYS=7" >> .env

# Expose port 8000
EXPOSE 8000

# Start the FastAPI server
CMD ["python", "start_server.py"]
