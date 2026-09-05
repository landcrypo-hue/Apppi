#!/bin/bash

set -e

echo "🚀 Starting Eservices Pi App Deployment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="eservices-pi-app"
DEPLOY_DIR="/opt/eservices"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root or with sudo"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_info "Checking deployment directory..."
if [ ! -d "$DEPLOY_DIR" ]; then
    print_info "Creating deployment directory: $DEPLOY_DIR"
    mkdir -p "$DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

print_info "Pulling latest changes from repository..."
if [ -d ".git" ]; then
    git pull origin main
else
    print_error "Not a git repository. Please clone your repository to $DEPLOY_DIR first."
    exit 1
fi

print_info "Checking environment variables..."
if [ ! -f ".env" ]; then
    print_error ".env file not found. Please create .env file from .env.example"
    exit 1
fi

print_info "Building Docker images..."
docker-compose build --no-cache

print_info "Stopping existing containers..."
docker-compose down

print_info "Starting new containers..."
docker-compose up -d

print_info "Waiting for services to be healthy..."
sleep 10

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_success "Deployment successful!"
    print_info "Application is running at: https://eservices5527.pinet.com"
    
    # Show container status
    echo ""
    print_info "Container Status:"
    docker-compose ps
    
    # Show logs
    echo ""
    print_info "Recent logs:"
    docker-compose logs --tail=20
else
    print_error "Deployment failed. Containers are not running."
    docker-compose logs
    exit 1
fi

print_success "Deployment completed successfully! 🎉"
