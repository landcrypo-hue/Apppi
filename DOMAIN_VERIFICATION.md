# Pi Network Domain Verification Guide

## Verification File Created

The domain validation file has been created at:
- **File Location**: `public/validation-key.txt`
- **Public URL**: `https://eservices5527.pinet.com/validation-key.txt`
- **Validation Key**: `8f4db23a293665a95a386be51615749ff72232ca1bd3d2b00754162c1293f9e9fa515e354133f94c2f6299f613ea3f77a5e62c1a5c54a77b0eb364ed6f9a04f5`

## Deployment Steps

### 1. Build and Deploy

\`\`\`bash
# Navigate to your project directory
cd /path/to/eservices-app

# Build the Next.js application
npm run build

# Deploy to your Pinet server
npm run deploy
# OR use the deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
\`\`\`

### 2. Verify File Accessibility

After deployment, test that the validation file is publicly accessible:

\`\`\`bash
# Using curl
curl https://eservices5527.pinet.com/validation-key.txt

# Using wget
wget https://eservices5527.pinet.com/validation-key.txt -O -

# Expected output:
# 8f4db23a293665a95a386be51615749ff72232ca1bd3d2b00754162c1293f9e9fa515e354133f94c2f6299f613ea3f77a5e62c1a5c54a77b0eb364ed6f9a04f5
\`\`\`

Or open in browser:
- https://eservices5527.pinet.com/validation-key.txt

### 3. Complete Pi Network Verification

1. Go to Pi Developer Portal: https://develop.pi.network
2. Navigate to your app settings
3. Enter your domain: `eservices5527.pinet.com`
4. Click "Verify Domain"
5. Pi Network will check for the validation file at the URL above

### 4. Docker Deployment (if using containers)

If deploying with Docker:

\`\`\`bash
# Rebuild the Docker image
docker build -t eservices-pi-app .

# Stop existing container
docker-compose down

# Start with new build
docker-compose up -d

# Verify the file is accessible
docker exec eservices-app ls -la /app/public/
\`\`\`

### 5. Kubernetes Deployment (if using K8s)

If deploying to Kubernetes:

\`\`\`bash
# Apply the deployment
kubectl apply -f k8s/

# Check pod status
kubectl get pods -n eservices

# Verify file in pod
kubectl exec -it <pod-name> -n eservices -- ls -la /app/public/

# Test from within cluster
kubectl exec -it <pod-name> -n eservices -- curl http://localhost:3000/validation-key.txt
\`\`\`

### Troubleshooting

**File not accessible:**
- Ensure the `public` folder is included in your build
- Check NGINX configuration allows `.txt` files
- Verify no caching is blocking the new file
- Check file permissions: `chmod 644 public/validation-key.txt`

**404 Error:**
- Confirm Next.js build includes static files from public folder
- Check deployment copied all files correctly
- Verify the public directory structure is maintained

**SSL/Certificate Issues:**
- Ensure HTTPS is properly configured
- Check that SSL certificate is valid for your domain
- Verify no redirect rules are interfering

**Clear Cache:**
\`\`\`bash
# Clear CDN cache if applicable
curl -X PURGE https://eservices5527.pinet.com/validation-key.txt

# Clear browser cache or test in incognito mode
\`\`\`

## Next.js Public Folder Behavior

- Files in the `public` folder are served at the root URL path
- No preprocessing or compilation is done on these files
- They are copied as-is to the build output
- Accessible directly via `/filename.ext`

## Verification Checklist

- [ ] File created at `public/validation-key.txt`
- [ ] Contains exactly the validation key (no extra spaces/newlines)
- [ ] Application built successfully
- [ ] Application deployed to eservices5527.pinet.com
- [ ] File accessible via browser
- [ ] File accessible via curl/wget
- [ ] Pi Network domain verification completed
- [ ] App manifest updated with verified domain

## Support

If verification fails after following these steps:
1. Check server logs for any errors
2. Verify DNS is pointing to correct server
3. Ensure firewall allows HTTP/HTTPS traffic
4. Contact Pinet support if infrastructure issues persist
5. Check Pi Developer Portal for specific error messages
