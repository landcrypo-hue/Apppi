# Quick Deployment Guide - Domain Validation File

## Current Status
✅ validation-key.txt created in `/public/` folder
✅ Next.js configured to serve static files
❌ **NOT YET DEPLOYED** to eservices5527.pinet.com

## Deployment Methods

### Method 1: GitLab CI/CD (Recommended)
\`\`\`bash
# Commit and push the validation file
git add public/validation-key.txt
git commit -m "Add Pi Network domain validation file"
git push origin main
\`\`\`
Your GitLab CI/CD pipeline will automatically deploy the app.

### Method 2: Manual Build & Deploy
\`\`\`bash
# 1. Build the app
npm run build

# 2. Upload to your server (replace with your credentials)
scp -r .next/standalone/* user@eservices5527.pinet.com:/var/www/eservices/
scp -r public/* user@eservices5527.pinet.com:/var/www/eservices/public/

# 3. Restart the app on server
ssh user@eservices5527.pinet.com "pm2 restart eservices"
\`\`\`

### Method 3: Docker Deployment
\`\`\`bash
# 1. Build Docker image
docker build -t eservices:latest .

# 2. Push to registry (if using one)
docker push your-registry/eservices:latest

# 3. Deploy on server
ssh user@eservices5527.pinet.com "cd /var/www/eservices && docker-compose pull && docker-compose up -d"
\`\`\`

### Method 4: Direct File Upload (Quickest)
If you just need the validation file deployed quickly:

\`\`\`bash
# Upload only the validation file
scp public/validation-key.txt user@eservices5527.pinet.com:/var/www/eservices/public/

# Or use SFTP/FTP client to upload:
# From: public/validation-key.txt
# To: /var/www/eservices/public/validation-key.txt
\`\`\`

## Verification Steps

After deployment, test the file:

\`\`\`bash
# 1. Check if file is accessible
curl https://eservices5527.pinet.com/validation-key.txt

# Expected output:
# 8f4db23a293665a95a386be51615749ff72232ca1bd3d2b00754162c1293f9e9fa515e354133f94c2f6299f613ea3f77a5e62c1a5c54a77b0eb364ed6f9a04f5

# 2. Verify exact content
curl -s https://eservices5527.pinet.com/validation-key.txt | wc -c
# Should output: 129 (128 chars + newline)
\`\`\`

## Troubleshooting

### File returns 404
- Check that the file is in the `/public` folder
- Verify the server is serving static files from the correct directory
- Check NGINX/Apache configuration for static file handling
- Ensure the app has been rebuilt and redeployed

### File has wrong content
- Verify the file wasn't corrupted during upload
- Check file encoding (should be UTF-8, no BOM)
- Re-upload the file from `public/validation-key.txt`

### CORS or Access Issues
- Check server CORS headers
- Verify file permissions: `chmod 644 validation-key.txt`
- Check NGINX/web server configuration

## Server Configuration Check

Make sure your NGINX config includes:

\`\`\`nginx
location / {
    # Next.js app
    proxy_pass http://localhost:3000;
    # ... other settings
}

# Serve static files directly
location ~* \.(txt|pdf|jpg|png|gif|ico|css|js)$ {
    root /var/www/eservices/public;
    expires 1d;
    add_header Cache-Control "public, immutable";
}
\`\`\`

## Need Help?

If deployment fails:
1. Check GitLab CI/CD pipeline logs
2. SSH into server and check app logs: `pm2 logs eservices`
3. Verify Next.js build completed: `ls -la .next/`
4. Test locally first: `npm run dev` then visit `http://localhost:3000/validation-key.txt`
