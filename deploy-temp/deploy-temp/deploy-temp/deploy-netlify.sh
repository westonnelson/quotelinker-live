#!/bin/bash

echo "🚀 Deploying QuoteLinker to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure looks good"

# Install function dependencies
if [ -d "netlify/functions" ]; then
    echo "📦 Installing function dependencies..."
    cd netlify/functions
    npm install
    cd ../..
    echo "✅ Function dependencies installed"
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."

# Login to Netlify (if not already logged in)
netlify status || netlify login

# Deploy
netlify deploy --prod --dir=.

echo "🎉 Deployment complete!"
echo ""
echo "Your site should be live at: https://quotelinker.com"
echo ""
echo "🔧 Next steps:"
echo "1. Set up environment variables in Netlify dashboard:"
echo "   - GEMINI_API_KEY (for AI functionality)"
echo "   - EMAIL_USER (for lead notifications)"
echo "   - EMAIL_PASS (for lead notifications)"
echo "   - NOTIFICATION_EMAIL (where to send leads)"
echo ""
echo "2. Configure custom domain in Netlify dashboard"
echo "3. Test the site on your phone!"
