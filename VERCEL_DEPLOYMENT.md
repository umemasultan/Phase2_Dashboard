# Vercel Deployment Guide

## Overview

This guide covers deploying the Task Manager Dashboard to Vercel. Since Vercel doesn't natively support Python backends in the same project, we'll deploy:

1. **Frontend (Next.js)** → Vercel
2. **Backend (FastAPI)** → Render/Railway/Heroku (or keep on Hugging Face Spaces)

## Option 1: Deploy Frontend to Vercel + Backend to Render (Recommended)

### Step 1: Deploy Backend to Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `task-manager-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd src && uvicorn main:app --host 0.0.0.0 --port $PORT`

5. Add Environment Variables:
   ```
   DATABASE_URL=sqlite:///./taskmanager.db
   SECRET_KEY=<your-secret-key>
   BETTER_AUTH_SECRET=<your-auth-secret>
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_DAYS=7
   ```

6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://task-manager-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Update vercel.json** with your backend URL:
   ```bash
   # Edit vercel.json and replace "your-backend-url" with your Render URL
   ```

4. **Deploy**:
   ```bash
   # Preview deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

5. **Set Environment Variable** in Vercel Dashboard:
   - Go to your project settings
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`

## Option 2: Deploy Both to Vercel (Frontend Only, Backend Elsewhere)

### Quick Deploy with Vercel CLI

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? task-manager-dashboard
# - Directory? ./
# - Override settings? Yes
# - Build Command? cd frontend && npm run build
# - Output Directory? frontend/.next
# - Development Command? cd frontend && npm run dev
```

### Deploy to Production

```bash
vercel --prod
```

## Option 3: Deploy via GitHub Integration

1. **Push to GitHub** (already done)

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository: `umemasultan/Phase2_Dashboard`
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Add Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

4. Click "Deploy"

## Backend Deployment Options

### Option A: Render (Free Tier Available)
- URL: https://render.com
- Free tier with auto-sleep after inactivity
- Easy Python deployment

### Option B: Railway (Free Trial)
- URL: https://railway.app
- Simple deployment
- Good for FastAPI

### Option C: Heroku
- URL: https://heroku.com
- Requires credit card for free tier
- Well-documented

### Option D: Keep on Hugging Face Spaces
- Deploy backend only to Hugging Face
- Use the Space URL as your API endpoint

## Update CORS in Backend

After deploying, update `backend/src/main.py` to allow your Vercel domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3002",
        "https://your-vercel-app.vercel.app",  # Add your Vercel URL
        "https://your-custom-domain.com"       # If using custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Environment Variables Summary

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (Render/Railway/etc)
```
DATABASE_URL=sqlite:///./taskmanager.db
SECRET_KEY=<generate-secure-key>
BETTER_AUTH_SECRET=<generate-secure-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
```

## Post-Deployment Checklist

- [ ] Backend is accessible at its URL
- [ ] Frontend can connect to backend API
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Authentication works (login/signup)
- [ ] Tasks can be created/edited/deleted
- [ ] Custom domain configured (optional)

## Troubleshooting

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend CORS allows your Vercel domain
- Check backend is running and accessible

### Build fails on Vercel
- Ensure `frontend/` directory structure is correct
- Check `package.json` has all dependencies
- Verify `next.config.js` syntax is correct

### Backend deployment fails
- Check `requirements.txt` is complete
- Verify start command is correct
- Check Python version compatibility

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS in backend with new domain

## Monitoring

- **Vercel**: Built-in analytics and logs
- **Render**: Logs available in dashboard
- **Backend Health**: Add `/health` endpoint for monitoring

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
