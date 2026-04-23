# 🚀 Deployment Guide - Phase II Task Manager

## Overview

This guide covers deploying the Task Manager application with Neon PostgreSQL database.

## Prerequisites

- ✅ Neon PostgreSQL account ([neon.tech](https://neon.tech))
- ✅ Git repository
- ✅ Node.js 18+ and Python 3.8+

---

## 1️⃣ Database Setup (Neon PostgreSQL)

### Step 1: Create Neon Account
1. Visit [https://neon.tech](https://neon.tech)
2. Sign up with GitHub or Google (free tier available)
3. Verify your email

### Step 2: Create Project
1. Click **"New Project"**
2. **Project Name**: `taskmanager-hackathon`
3. **Region**: Select closest to you (e.g., AWS US East)
4. **Postgres Version**: 16 (default)
5. Click **"Create Project"**

### Step 3: Get Connection String
1. In project dashboard, find **"Connection Details"**
2. Select **"Connection string"** tab
3. Copy the full connection string:
   ```
   postgresql://username:password@ep-xxxxx-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Save this securely** - you'll need it next

---

## 2️⃣ Backend Configuration

### Update Environment Variables

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Edit `.env` file:
   ```bash
   # Replace SQLite with your Neon connection string
   DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   
   # Keep these as-is (already configured)
   SECRET_KEY=your-secret-key-change-in-production
   BETTER_AUTH_SECRET=is_Fs19Ena_zOLpRzd2I7xl_7HN9L2loots-CqazLQ0
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_DAYS=7
   ```

3. **Important**: Replace the entire `DATABASE_URL` line with your Neon connection string

### Initialize Database

```bash
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Start the server (it will auto-create tables)
python start_server.py
```

You should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

The database tables will be created automatically on first run.

---

## 3️⃣ Frontend Configuration

### Update Environment Variables

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Check `.env.local` file (should already be configured):
   ```bash
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BETTER_AUTH_SECRET=is_Fs19Ena_zOLpRzd2I7xl_7HN9L2loots-CqazLQ0
   BETTER_AUTH_URL=http://localhost:3000
   ```

### Start Frontend

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 4️⃣ Testing the Application

### 1. Test Backend API

Open browser and visit:
- **Health Check**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### 2. Test Frontend

1. Open http://localhost:3000
2. Click **"Sign Up"**
3. Create a new account:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. You should be redirected to dashboard
5. Create a new task to verify database connection

### 3. Verify Database

1. Go to Neon dashboard
2. Click **"Tables"** in your project
3. You should see:
   - `users` table
   - `tasks` table

---

## 5️⃣ API Endpoints

All endpoints require JWT token in `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/{user_id}/tasks` | List all tasks |
| POST | `/api/{user_id}/tasks` | Create task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion |

---

## 6️⃣ Troubleshooting

### Database Connection Issues

**Error**: `could not connect to server`
- ✅ Check Neon connection string is correct
- ✅ Verify `sslmode=require` is in connection string
- ✅ Check internet connection
- ✅ Verify Neon project is active (not paused)

**Error**: `relation "users" does not exist`
- ✅ Restart backend server to auto-create tables
- ✅ Check DATABASE_URL is pointing to Neon (not SQLite)

### Authentication Issues

**Error**: `401 Unauthorized`
- ✅ Check JWT token is being sent in headers
- ✅ Verify BETTER_AUTH_SECRET matches in frontend and backend
- ✅ Token might be expired - login again

### Frontend Issues

**Error**: `Failed to fetch`
- ✅ Check backend is running on port 8000
- ✅ Verify NEXT_PUBLIC_API_URL in `.env.local`
- ✅ Check CORS settings in backend `main.py`

---

## 7️⃣ Production Deployment

### Backend (Recommended: Railway, Render, or Fly.io)

1. Set environment variables:
   ```
   DATABASE_URL=<your-neon-connection-string>
   SECRET_KEY=<generate-new-secret>
   BETTER_AUTH_SECRET=<same-as-frontend>
   ```

2. Deploy command:
   ```bash
   uvicorn src.main:app --host 0.0.0.0 --port $PORT
   ```

### Frontend (Recommended: Vercel)

1. Connect GitHub repository
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   NEXT_PUBLIC_APP_URL=<your-frontend-url>
   BETTER_AUTH_SECRET=<same-as-backend>
   ```
3. Deploy automatically on push

---

## ✅ Checklist

- [ ] Neon PostgreSQL account created
- [ ] Project created in Neon
- [ ] Connection string copied
- [ ] Backend `.env` updated with Neon URL
- [ ] Backend running successfully
- [ ] Frontend `.env.local` configured
- [ ] Frontend running successfully
- [ ] User registration working
- [ ] Task creation working
- [ ] Database tables visible in Neon dashboard

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check backend logs for detailed error messages
4. Verify Neon project is active and not paused

---

**🎉 Congratulations!** Your Task Manager is now running with Neon PostgreSQL!

---

## 8️⃣ Docker Deployment (Alternative Method)

### Prerequisites
- Docker installed
- Docker Compose installed

### Quick Start with Docker

1. **Create `.env` file in root directory**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your Neon connection string**:
   ```bash
   DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   SECRET_KEY=your-secret-key
   BETTER_AUTH_SECRET=your-better-auth-secret
   ```

3. **Start all services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Stop and remove volumes
docker-compose down -v
```

### Production Docker Build

**Backend**:
```bash
cd backend
docker build -t taskmanager-backend .
docker run -p 8000:8000 \
  -e DATABASE_URL="postgresql://..." \
  -e SECRET_KEY="..." \
  -e BETTER_AUTH_SECRET="..." \
  taskmanager-backend
```

**Frontend**:
```bash
cd frontend
docker build -t taskmanager-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="http://localhost:8000" \
  taskmanager-frontend
```

---

## 9️⃣ Environment Variables Reference

### Backend (.env)
```bash
DATABASE_URL=postgresql://...           # Neon connection string
SECRET_KEY=<random-secret>              # For JWT signing
BETTER_AUTH_SECRET=<shared-secret>      # Shared with frontend
ALGORITHM=HS256                         # JWT algorithm
ACCESS_TOKEN_EXPIRE_DAYS=7              # Token expiry
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000        # Backend URL
NEXT_PUBLIC_APP_URL=http://localhost:3000        # Frontend URL
BETTER_AUTH_SECRET=<shared-secret>               # Same as backend
BETTER_AUTH_URL=http://localhost:3000            # Auth URL
```

---

**Updated**: April 24, 2026
