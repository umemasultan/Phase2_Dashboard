# Application Running on Localhost

## Status: ✅ RUNNING

Both frontend and backend servers are successfully running on your local machine.

## Access URLs

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Status**: ✅ Running on port 3000
- **Process ID**: 18492

### Backend (FastAPI)
- **URL**: http://localhost:8000
- **API Root**: http://localhost:8000/
- **API Docs**: http://localhost:8000/docs
- **Status**: ✅ Running on port 8000
- **Process ID**: 17436

## Database
- **Type**: SQLite
- **Location**: `E:\Hackathon_2\Phase_2\backend\taskmanager.db`
- **Status**: Connected and operational

## Recent Activity
- Backend is processing authentication and task requests successfully
- Frontend is serving pages and making API calls to backend
- CORS is properly configured for localhost:3000

## How to Use

1. **Open the application**: Navigate to http://localhost:3000 in your browser
2. **Login/Signup**: Use the authentication pages to create an account or login
3. **Manage Tasks**: Create, view, update, and delete tasks

## Stop the Servers

If you need to stop the servers:

```bash
# Stop frontend (port 3000)
taskkill /PID 18492 /F

# Stop backend (port 8000)
taskkill /PID 17436 /F
```

## Restart the Servers

```bash
# Start backend
cd backend
python start_server.py

# Start frontend (in a new terminal)
cd frontend
npm run dev
```

## Environment Configuration

Backend is using:
- SQLite database
- JWT authentication
- 7-day token expiration

Frontend is configured to:
- Connect to http://localhost:8000 for API calls
- Use environment variables from .env.local

## Log Files

- Backend: `backend/backend_output.log`
- Frontend: `frontend/frontend_output.log`

---
Last Updated: 2026-04-24 17:38 UTC
