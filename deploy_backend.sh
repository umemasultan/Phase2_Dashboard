#!/bin/bash

# Quick Backend Deployment Script for Hugging Face Spaces

echo "🚀 Task Manager Backend - Hugging Face Deployment"
echo "=================================================="
echo ""

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "📦 Creating deployment package..."
cd backend

# Create a temporary deployment directory
DEPLOY_DIR="hf_deploy_temp"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy necessary files
echo "📋 Copying files..."
cp Dockerfile $DEPLOY_DIR/
cp README.md $DEPLOY_DIR/
cp requirements.txt $DEPLOY_DIR/
cp start_server.py $DEPLOY_DIR/
cp -r src $DEPLOY_DIR/

echo ""
echo "✅ Deployment package ready in: backend/$DEPLOY_DIR/"
echo ""
echo "📝 Next Steps:"
echo "1. Go to: https://huggingface.co/new-space"
echo "2. Create a new Space:"
echo "   - Name: task-manager-backend"
echo "   - SDK: Docker"
echo "   - License: MIT"
echo ""
echo "3. Upload all files from: backend/$DEPLOY_DIR/"
echo "   OR use git:"
echo ""
echo "   cd backend/$DEPLOY_DIR"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial backend deployment'"
echo "   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/task-manager-backend"
echo "   git push hf main"
echo ""
echo "4. Once deployed, your backend URL will be:"
echo "   https://YOUR_USERNAME-task-manager-backend.hf.space"
echo ""
echo "5. Add this URL to Vercel:"
echo "   vercel env add NEXT_PUBLIC_API_URL production"
echo "   (Enter the URL when prompted)"
echo ""
echo "6. Redeploy frontend:"
echo "   vercel --prod"
echo ""
