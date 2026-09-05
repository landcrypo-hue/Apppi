# Eservices Pi App - Deployment Guide

## Overview

This guide provides complete instructions for deploying the Eservices Pi Network app to your Pinet server at `eservices5527.pinet.com`.

## Prerequisites

- Pinet server with Ubuntu 20.04+ or Debian 11+
- Root or sudo access to the server
- Domain configured: `eservices5527.pinet.com`
- Pi Network API Key (from Pi Developer Portal)
- GitLab account and repository

## Architecture

\`\`\`
┌─────────────────┐
│   Pi Browser    │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────┐
│  Nginx Reverse  │
│     Proxy       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Next.js App   │
│   (Container)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Pi Network    │
│      API        │
└─────────────────┘
\`\`\`

## Step 1: Server Setup

### 1.1 Connect to your server

\`\`\`bash
ssh root@eservices5527.pinet.com
\`\`\`

### 1.2 Run the setup script

\`\`\`bash
# Download the setup script
wget https://raw.githubusercontent.com/your-repo/eservices/main/scripts/setup-server.sh

# Make it executable
chmod +x setup-server.sh

# Run the setup
./setup-server.sh
\`\`\`

This installs:
- Docker & Docker Compose
- Git
- Nginx
- Certbot (for SSL)
- Firewall configuration

## Step 2: GitLab Configuration

### 2.1 Create GitLab repository

1. Go to GitLab and create a new project: `eservices-pi-app`
2. Push your code to the repository

\`\`\`bash
git init
git remote add origin git@gitlab.com:your-username/eservices-pi-app.git
git add .
git commit -m "Initial commit"
git push -u origin main
\`\`\`

### 2.2 Configure GitLab CI/CD Variables

Go to Settings > CI/CD > Variables and add:

| Variable | Value | Protected | Masked |
|----------|-------|-----------|--------|
| `CI_REGISTRY` | `registry.gitlab.com` | Yes | No |
| `CI_REGISTRY_USER` | Your GitLab username | Yes | No |
| `CI_REGISTRY_PASSWORD` | Your GitLab token | Yes | Yes |
| `DEPLOY_SERVER` | `eservices5527.pinet.com` | Yes | No |
| `DEPLOY_USER` | `root` or deployment user | Yes | No |
| `SSH_PRIVATE_KEY` | Your SSH private key | Yes | Yes |
| `PI_API_KEY` | Your Pi Network API key | Yes | Yes |

### 2.3 Setup SSH Keys

On your local machine:

\`\`\`bash
# Generate SSH key
ssh-keygen -t ed25519 -C "gitlab-ci@eservices"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@eservices5527.pinet.com

# Add private key to GitLab CI/CD variables
cat ~/.ssh/id_ed25519  # Copy this to SSH_PRIVATE_KEY variable
\`\`\`

## Step 3: SSL Certificate Setup

### 3.1 Configure DNS

Ensure your domain points to your server:

\`\`\`bash
# Check DNS configuration
dig eservices5527.pinet.com
\`\`\`

### 3.2 Generate SSL Certificate

\`\`\`bash
# Stop nginx if running
systemctl stop nginx

# Generate certificate
certbot certonly --standalone -d eservices5527.pinet.com

# Copy certificates to project directory
cp /etc/letsencrypt/live/eservices5527.pinet.com/fullchain.pem /opt/eservices/nginx/ssl/
cp /etc/letsencrypt/live/eservices5527.pinet.com/privkey.pem /opt/eservices/nginx/ssl/
\`\`\`

### 3.3 Setup auto-renewal

\`\`\`bash
# Add cron job for renewal
echo "0 0 * * * certbot renew --quiet && cp /etc/letsencrypt/live/eservices5527.pinet.com/*.pem /opt/eservices/nginx/ssl/ && docker-compose -f /opt/eservices/docker-compose.yml restart nginx" | crontab -
\`\`\`

## Step 4: Application Deployment

### 4.1 Clone repository to server

\`\`\`bash
cd /opt/eservices
git clone git@gitlab.com:your-username/eservices-pi-app.git .
\`\`\`

### 4.2 Configure environment variables

\`\`\`bash
# Copy example env file
cp .env.example .env

# Edit with your values
nano .env
\`\`\`

Required variables:
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://eservices5527.pinet.com
PI_API_KEY=your_actual_pi_api_key_here
PI_SANDBOX_MODE=true
NEXT_PUBLIC_PI_APP_ID=eservices-pi-app
\`\`\`

### 4.3 Deploy the application

\`\`\`bash
# Make deploy script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
\`\`\`

## Step 5: Pi Network Registration

### 5.1 Register your app

1. Go to [Pi Developer Portal](https://develop.pi)
2. Click "Create New App"
3. Fill in details from `app.json`:
   - App Name: Eservices
   - Frontend URL: `https://eservices5527.pinet.com`
   - Backend URL: `https://eservices5527.pinet.com/api`
   - Redirect URIs:
     - `https://eservices5527.pinet.com/auth/callback`
     - `https://eservices5527.pinet.com/payments/callback`

4. Copy your API Key and update `.env` file on server

### 5.2 Configure permissions

Enable these permissions in Pi Developer Portal:
- ✓ Username
- ✓ Payments
- ✓ Wallet Address

## Step 6: Kubernetes Deployment (Alternative)

If using Kubernetes instead of Docker Compose:

### 6.1 Apply configurations

\`\`\`bash
# Create namespace
kubectl create namespace pi-apps

# Apply secrets
kubectl apply -f k8s/secrets.yaml

# Apply deployment
kubectl apply -f k8s/deployment.yaml
\`\`\`

### 6.2 Verify deployment

\`\`\`bash
# Check pods
kubectl get pods -n pi-apps

# Check service
kubectl get svc -n pi-apps

# Check ingress
kubectl get ingress -n pi-apps
\`\`\`

## Step 7: Verification

### 7.1 Check application status

\`\`\`bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f eservices-app

# Check nginx logs
docker-compose logs -f nginx
\`\`\`

### 7.2 Test endpoints

\`\`\`bash
# Health check
curl https://eservices5527.pinet.com/api/health

# Pi SDK test
curl https://eservices5527.pinet.com/test-pi
\`\`\`

### 7.3 Test in Pi Browser

1. Open Pi Browser on mobile device
2. Navigate to `https://eservices5527.pinet.com`
3. Verify Pi SDK loads (check diagnostics)
4. Test login with Pi
5. Test payment flow

## Troubleshooting

### Issue: Pi SDK not loading

**Solution:**
1. Check browser console for errors
2. Verify script tag in page source
3. Ensure CORS headers are set correctly
4. Check Content Security Policy

\`\`\`bash
# Check nginx CSP headers
docker-compose exec nginx cat /etc/nginx/nginx.conf | grep Content-Security-Policy
\`\`\`

### Issue: SSL certificate errors

**Solution:**
\`\`\`bash
# Verify certificate
openssl s_client -connect eservices5527.pinet.com:443 -servername eservices5527.pinet.com

# Renew certificate
certbot renew --force-renewal
\`\`\`

### Issue: Container won't start

**Solution:**
\`\`\`bash
# Check logs
docker-compose logs eservices-app

# Rebuild without cache
docker-compose build --no-cache

# Check environment variables
docker-compose config
\`\`\`

### Issue: GitLab CI/CD fails

**Solution:**
1. Check GitLab CI/CD variables are set correctly
2. Verify SSH key has access to server
3. Check runner logs in GitLab
4. Test SSH connection manually

\`\`\`bash
# Test SSH from GitLab runner
ssh -i ~/.ssh/id_ed25519 root@eservices5527.pinet.com
\`\`\`

## Monitoring

### Check application health

\`\`\`bash
# Application status
curl https://eservices5527.pinet.com/api/health

# Container stats
docker stats

# Logs
docker-compose logs -f --tail=100
\`\`\`

### Setup monitoring (optional)

Consider adding:
- Prometheus for metrics
- Grafana for dashboards
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

## Maintenance

### Update application

\`\`\`bash
cd /opt/eservices
git pull origin main
./scripts/deploy.sh
\`\`\`

### Backup

\`\`\`bash
# Backup volumes
docker-compose stop
tar -czf backup-$(date +%Y%m%d).tar.gz /opt/eservices
docker-compose start
\`\`\`

### Scale deployment

Edit `docker-compose.yml`:
\`\`\`yaml
deploy:
  replicas: 3  # Increase replicas
\`\`\`

Or for Kubernetes:
\`\`\`bash
kubectl scale deployment eservices-deployment --replicas=5 -n pi-apps
\`\`\`

## Security Checklist

- [x] SSL/TLS enabled and configured
- [x] Firewall configured (UFW)
- [x] Rate limiting enabled in Nginx
- [x] Security headers configured
- [x] Environment variables secured
- [x] SSH key-based authentication
- [x] Regular security updates scheduled
- [x] Backup strategy implemented

## Support

For issues or questions:
- Email: support@eservices5527.pinet.com
- Documentation: https://eservices5527.pinet.com/docs
- Pi Network: https://developers.minepi.com

## Next Steps

1. Test all features in Pi Browser
2. Submit app for Pi Network review
3. Monitor logs and performance
4. Gather user feedback
5. Iterate and improve

---

**Deployment Status:** Ready for Production ✅
