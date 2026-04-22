#!/bin/bash

# Quick Start Script for Klaviyo Pricing Calculator V2
# This script starts a local web server and opens the calculator in your browser

echo "🚀 Starting Klaviyo Pricing Calculator V2..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    echo "📡 Starting local server on http://localhost:8000"
    echo ""
    echo "📋 To test:"
    echo "   1. Open http://localhost:8000/index.html in your browser"
    echo "   2. Click through all 5 tabs"
    echo "   3. Open browser console (F12) and run: runComprehensiveTests()"
    echo ""
    echo "🛑 To stop server: Press Ctrl+C"
    echo ""

    # Try to open browser automatically
    sleep 2
    if command -v open &> /dev/null; then
        # macOS
        open http://localhost:8000/index.html
    elif command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open http://localhost:8000/index.html
    elif command -v start &> /dev/null; then
        # Windows
        start http://localhost:8000/index.html
    fi

    # Start server
    python3 -m http.server 8000

elif command -v python &> /dev/null; then
    echo "⚠️  Python 3 not found, trying Python 2..."
    echo "📡 Starting local server on http://localhost:8000"
    echo ""
    echo "📋 To test:"
    echo "   1. Open http://localhost:8000/index.html in your browser"
    echo "   2. Click through all 5 tabs"
    echo "   3. Open browser console (F12) and run: runComprehensiveTests()"
    echo ""
    echo "🛑 To stop server: Press Ctrl+C"
    echo ""

    python -m SimpleHTTPServer 8000

else
    echo "❌ Python not found!"
    echo ""
    echo "Please install Python 3 or use an alternative:"
    echo ""
    echo "Option 1: Install Python 3"
    echo "  macOS: brew install python3"
    echo "  Ubuntu: sudo apt-get install python3"
    echo "  Windows: Download from python.org"
    echo ""
    echo "Option 2: Use Node.js http-server"
    echo "  npm install -g http-server"
    echo "  http-server -p 8000"
    echo ""
    echo "Option 3: Use PHP"
    echo "  php -S localhost:8000"
    echo ""
    exit 1
fi
