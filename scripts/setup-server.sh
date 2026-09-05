#!/bin/bash

set -e

echo "🔧 Setting up Pinet Server for Pi App Deployment"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root"
    exit 1
fi

# Update system
print_info "Updating system packages..."
apt-get update && apt-get upgrade -y
print_success "System updated"

# Install Docker
print_info "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    rm get-docker.sh
    print_success "Docker installed"
else
    print_success "Docker already installed"
fi

# Install Docker Compose
print_info "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed"
else
    print_success "Docker Compose already installed"
fi

# Install Git
print_info "Installing Git..."
if ! command -v git &> /dev/null; then
    apt-get install -y git
    print_success "Git installed"
else
    print_success "Git already installed"
fi

# Install Nginx (optional, if not using Docker Compose nginx)
print_info "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
    systemctl enable nginx
    print_success "Nginx installed"
else
    print_success "Nginx already installed"
fi

# Install Certbot for SSL
print_info "Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
    print_success "Certbot installed"
else
    print_success "Certbot already installed"
fi

# Create deployment directory
print_info "Creating deployment directory..."
mkdir -p /opt/eservices
mkdir -p /opt/eservices/nginx/ssl
mkdir -p /opt/eservices/nginx/logs
print_success "Directories created"

# Configure firewall
print_info "Configuring firewall..."
apt-get install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
print_success "Firewall configured"

# Setup SSL certificate
print_info "Setting up SSL certificate..."
print_info "Run the following command manually after DNS is configured:"
echo "certbot certonly --nginx -d eservices5527.pinet.com"

print_success "Server setup completed! 🎉"
print_info "Next steps:"
echo "1. Clone your repository to /opt/eservices"
echo "2. Create .env file from .env.example"
echo "3. Configure SSL certificate with certbot"
echo "4. Run ./scripts/deploy.sh to deploy the application"
