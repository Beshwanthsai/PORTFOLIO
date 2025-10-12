#!/bin/bash

# Portfolio Development Helper Script
# This script helps with local development and testing

set -e

echo "🚀 Portfolio Development Helper"
echo "================================"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher)"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Validate HTML
echo "🔍 Validating HTML..."
npm run validate

# Start development server
echo "🌐 Starting development server..."
echo "📱 Your portfolio will be available at: http://localhost:3000"
echo "🔄 The server will automatically reload when you make changes"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm start