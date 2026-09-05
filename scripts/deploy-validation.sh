#!/bin/bash
# Quick deployment script for validation file

echo "🚀 Deploying validation file to PiNet..."

# Step 1: Build the Next.js app
echo "📦 Building Next.js app..."
npm run build

# Step 2: Deploy to your PiNet server
# Replace with your actual deployment method

# Option A: If using GitLab CI/CD (push to trigger pipeline)
echo "📤 Pushing to GitLab..."
git add public/validation-key.txt
git commit -m "Add Pi Network domain validation file"
git push origin main

# Option B: If using direct SSH/SCP
# echo "📤 Uploading via SCP..."
# scp -r .next/standalone/* user@eservices5527.pinet.com:/var/www/eservices/
# scp public/validation-key.txt user@eservices5527.pinet.com:/var/www/eservices/public/

# Option C: If using Docker
# echo "🐳 Building and pushing Docker image..."
# docker build -t eservices:latest .
# docker push your-registry/eservices:latest
# ssh user@eservices5527.pinet.com "docker-compose pull && docker-compose up -d"

echo "✅ Deployment initiated!"
echo "🔍 Test the file at: https://eservices5527.pinet.com/validation-key.txt"
