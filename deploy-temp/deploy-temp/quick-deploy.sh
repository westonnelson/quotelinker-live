#!/bin/bash

echo "🚀 Deploying QuoteLinker with Enhanced UI..."

# Create a clean deployment folder
rm -rf ./deploy-temp
mkdir deploy-temp

# Copy all necessary files (excluding development files)
cp -r . deploy-temp/ 2>/dev/null || true

# Clean up deployment folder
cd deploy-temp
rm -rf .git .env deploy-temp
rm -f deploy.sh deploy-netlify.sh *.md

echo "✅ Deployment package ready!"
echo "📂 Files prepared in ./deploy-temp/"
echo ""
echo "🌐 Next steps:"
echo "1. Drag the 'deploy-temp' folder to: https://app.netlify.com/drop"
echo "2. Your enhanced UI will be live!"
echo "3. Your API key is already configured in Netlify"
echo ""

# Open the deployment folder
open ./deploy-temp

echo "🎉 Ready to deploy!"
