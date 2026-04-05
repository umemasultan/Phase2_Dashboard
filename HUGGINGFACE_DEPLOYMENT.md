# Hugging Face Spaces Deployment Guide

## Prerequisites

1. Create a Hugging Face account at https://huggingface.co/join
2. Create a new Space at https://huggingface.co/new-space
3. Choose "Docker" as the SDK

## Deployment Steps

### Option 1: Using Git (Recommended)

1. **Initialize Hugging Face Space**
   ```bash
   # Add Hugging Face remote
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   ```

2. **Prepare files**
   ```bash
   # Copy the Hugging Face README
   cp README_HF.md README.md
   
   # Create .env file from example
   cp .env.example backend/.env
   ```

3. **Update environment variables**
   Edit `backend/.env` and set secure values for:
   - `SECRET_KEY`
   - `BETTER_AUTH_SECRET`

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Deploy to Hugging Face Spaces"
   git push hf main
   ```

### Option 2: Using Hugging Face Web Interface

1. Go to your Space settings
2. Click "Files and versions"
3. Upload all project files including:
   - `Dockerfile`
   - `backend/` directory
   - `frontend/` directory
   - `README.md` (use README_HF.md content)

### Option 3: Using Hugging Face CLI

1. **Install Hugging Face CLI**
   ```bash
   pip install huggingface_hub
   ```

2. **Login**
   ```bash
   huggingface-cli login
   ```

3. **Upload files**
   ```bash
   huggingface-cli upload YOUR_USERNAME/YOUR_SPACE_NAME . --repo-type=space
   ```

## Environment Variables

Set these in your Hugging Face Space settings:

- `SECRET_KEY`: Your JWT secret key (generate a secure random string)
- `BETTER_AUTH_SECRET`: Your auth secret (generate a secure random string)
- `DATABASE_URL`: `sqlite:///./taskmanager.db` (default)
- `ALGORITHM`: `HS256` (default)
- `ACCESS_TOKEN_EXPIRE_DAYS`: `7` (default)

## Post-Deployment

1. Your app will be available at: `https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME`
2. The build process may take 5-10 minutes
3. Check the logs in the Space interface for any errors

## Troubleshooting

- **Build fails**: Check Dockerfile syntax and paths
- **Backend not responding**: Verify port 8000 is correctly configured
- **Frontend not loading**: Check that Next.js build completed successfully
- **Database errors**: Ensure SQLite file permissions are correct

## Demo Credentials

- Email: `test@example.com`
- Password: `password123`

## Notes

- The app uses SQLite database which will reset on Space restart
- For production, consider using a persistent database
- Free tier Spaces may sleep after inactivity
