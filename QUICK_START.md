# ⚡ Quick Start Guide - 5 Minutes to Running App

## 🎯 Goal
Get the Task Manager running locally in 5 minutes.

---

## Option 1: Docker (Easiest) 🐳

### Prerequisites
- Docker Desktop installed
- Neon PostgreSQL account (optional for local dev)

### Steps

1. **Clone and navigate**:
   ```bash
   cd Phase_2
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Start everything**:
   ```bash
   docker-compose up --build
   ```

4. **Open browser**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs

**Done!** 🎉

---

## Option 2: Manual Setup (More Control) 🛠️

### Prerequisites
- Node.js 18+
- Python 3.8+

### Backend (Terminal 1)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# OR (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python start_server.py
```

✅ Backend running on http://localhost:8000

### Frontend (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running on http://localhost:3000

---

## 🧪 Test It Out

1. **Open** http://localhost:3000
2. **Click** "Sign Up"
3. **Create account**:
   - Name: Test User
   - Email: test@test.com
   - Password: password123
4. **Create a task** to verify everything works!

---

## 🗄️ Add Neon PostgreSQL (Optional)

### Why?
- SQLite works for local dev
- Neon needed for production/deployment

### Steps

1. **Create Neon account**: [neon.tech](https://neon.tech)
2. **Create project**: `taskmanager-hackathon`
3. **Copy connection string**
4. **Update backend/.env**:
   ```bash
   DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
5. **Restart backend**

Tables auto-create on startup!

---

## 🚨 Troubleshooting

### "Port already in use"
```bash
# Kill process on port 8000 (backend)
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

### "Module not found"
```bash
# Backend:
pip install -r requirements.txt

# Frontend:
rm -rf node_modules package-lock.json
npm install
```

### "Failed to fetch"
- ✅ Check backend is running on port 8000
- ✅ Check frontend .env has correct API URL
- ✅ Try http://127.0.0.1:8000 instead of localhost

---

## 📚 Next Steps

- **Full deployment guide**: See `DEPLOYMENT.md`
- **API documentation**: http://localhost:8000/docs
- **Project status**: See `PROJECT_STATUS.md`

---

**Time to running app**: ~5 minutes ⚡
