# Deploy Backend to Hugging Face Spaces

## Quick Steps:

### 1. Create a New Space

1. Go to https://huggingface.co/new-space
2. Fill in:
   - **Space name**: `task-manager-backend`
   - **License**: MIT
   - **SDK**: Docker
   - **Space hardware**: CPU basic (free)

### 2. Upload Backend Files

You have two options:

#### Option A: Using Git (Recommended)

```bash
# Add Hugging Face remote for backend only
cd backend
git init
git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/task-manager-backend

# Copy the backend README as main README
cp README.md ../README_BACKEND_HF.md

# Commit and push
git add .
git commit -m "Initial backend deployment"
git push hf main
```

#### Option B: Using Hugging Face Web Interface

1. Go to your Space: `https://huggingface.co/spaces/YOUR_USERNAME/task-manager-backend`
2. Click "Files and versions" → "Add file" → "Upload files"
3. Upload all files from the `backend/` directory:
   - `Dockerfile`
   - `README.md`
   - `requirements.txt`
   - `start_server.py`
   - `src/` folder (all files)

### 3. Set Environment Variables (Optional but Recommended)

In your Space settings, add these for better security:

```
SECRET_KEY=<generate-a-secure-random-string>
BETTER_AUTH_SECRET=<generate-another-secure-random-string>
```

Generate secure keys with:
```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

### 4. Wait for Build

The Space will automatically build and deploy. This takes 5-10 minutes.

Your backend will be available at:
```
https://huggingface.co/spaces/YOUR_USERNAME/task-manager-backend
```

### 5. Update Vercel Frontend

Once your backend is deployed, add the environment variable to Vercel:

```bash
vercel env add NEXT_PUBLIC_API_URL production
```

When prompted, enter:
```
https://YOUR_USERNAME-task-manager-backend.hf.space
```

Then redeploy the frontend:
```bash
vercel --prod
```

## Testing

1. Test backend health:
   ```
   curl https://YOUR_USERNAME-task-manager-backend.hf.space/
   ```

2. Test registration:
   ```bash
   curl -X POST https://YOUR_USERNAME-task-manager-backend.hf.space/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"password123"}'
   ```

3. Visit your frontend:
   ```
   https://task-manager-dashboard-nu.vercel.app
   ```

## Troubleshooting

- **Space not building**: Check Dockerfile syntax and requirements.txt
- **CORS errors**: Backend CORS is already configured for your Vercel domain
- **Database resets**: Hugging Face Spaces use ephemeral storage; database resets on restart
- **Space sleeping**: Free tier Spaces sleep after inactivity; first request may be slow

## Files Structure for Hugging Face

```
backend/
├── Dockerfile          # Docker configuration
├── README.md          # Space description (will show on HF)
├── requirements.txt   # Python dependencies
├── start_server.py    # Server startup script
└── src/              # Application code
    ├── main.py       # FastAPI app
    ├── routers/      # API endpoints
    ├── models/       # Database models
    └── db/           # Database setup
```

---

**Need help?** Check the main `HUGGINGFACE_DEPLOYMENT.md` for more details.
