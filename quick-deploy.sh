#!/bin/bash

echo "🚀 QuoteLinker Production Deployment"
echo "====================================="

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check for proper directory
if [ ! -f "index.html" ] || [ ! -d "netlify/functions" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install all dependencies
echo "📦 Installing dependencies..."
npm install

# Install Netlify function dependencies
echo "📦 Installing Netlify function dependencies..."
cd netlify/functions
npm install
cd ../..

# Update version in package.json to today's date
TODAY=$(date +"%Y.%m.%d")
sed -i '' "s/\"version\": \".*\"/\"version\": \"$TODAY\"/" package.json
echo "✅ Updated version to $TODAY"

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."

# Login to Netlify if needed
netlify status || netlify login

# Deploy with production flag
netlify deploy --prod --dir=.

echo "🎉 Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Verify these environment variables in Netlify dashboard:"
echo "   - GEMINI_API_KEY (for AI functionality)"
echo "   - EMAIL_USER (for lead notifications)"
echo "   - EMAIL_PASS (for lead notifications)"
echo "   - NOTIFICATION_EMAIL (where to send leads)"
echo ""
echo "✅ Production deployment is now live!"
