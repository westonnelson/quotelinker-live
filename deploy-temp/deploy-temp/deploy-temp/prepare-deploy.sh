#!/bin/bash

# 🚀 Prepare QuoteLinker for Redeployment
echo "🚀 Preparing QuoteLinker for redeployment..."

# Create clean deployment directory
DEPLOY_DIR="/tmp/quotelinker-deploy"
echo "📁 Creating deployment directory: $DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copy all files except unwanted ones
echo "📋 Copying project files..."
cd /Users/weston/quotelinker-live

# Copy all files and directories
cp -r * "$DEPLOY_DIR/" 2>/dev/null || true

# Remove unwanted files/directories
echo "🧹 Cleaning up deployment directory..."
rm -rf "$DEPLOY_DIR/.git"
rm -rf "$DEPLOY_DIR/node_modules"
rm -f "$DEPLOY_DIR"/*.md
rm -f "$DEPLOY_DIR"/deploy*.sh
rm -f "$DEPLOY_DIR"/quick-deploy.sh
rm -f "$DEPLOY_DIR"/.env

# Verify function files are present
echo "✅ Verifying Netlify function files..."
if [ -f "$DEPLOY_DIR/netlify/functions/ai-chat.js" ]; then
    echo "   ✓ ai-chat.js found"
else
    echo "   ❌ ai-chat.js missing!"
    exit 1
fi

if [ -f "$DEPLOY_DIR/netlify/functions/package.json" ]; then
    echo "   ✓ package.json found"
else
    echo "   ❌ package.json missing!"
    exit 1
fi

# List deployment contents
echo "📦 Deployment directory contents:"
ls -la "$DEPLOY_DIR"

echo ""
echo "🎯 Ready for deployment! Next steps:"
echo "1. Go to: https://app.netlify.com/sites/bespoke-paprenjak-d83b63/deploys"
echo "2. Drag the folder: $DEPLOY_DIR"
echo "3. Wait for deployment to complete"
echo "4. Test AI chat functionality"

# Open the deployment directory
echo "📂 Opening deployment directory..."
open "$DEPLOY_DIR"

echo "✨ Done! Ready to deploy."
