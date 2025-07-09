#!/bin/bash

echo "🚀 Deploying QuoteLinker to production..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Building assets..."

# Create a temporary build directory
mkdir -p dist
cp -r *.html *.png *.ico *.svg *.json dist/

echo "✅ Assets copied to dist/"

# Deploy Cloud Function (if gcloud is available)
if command -v gcloud &> /dev/null; then
    echo "🔧 Deploying Cloud Function..."
    cd functions
    gcloud functions deploy leadNotification \
        --runtime nodejs18 \
        --trigger-http \
        --allow-unauthenticated \
        --source .
    cd ..
    echo "✅ Cloud Function deployed"
else
    echo "⚠️  gcloud CLI not found. Please deploy the Cloud Function manually."
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Upload the 'dist' folder contents to your hosting provider"
echo "2. Configure your domain DNS to point to your hosting provider"
echo "3. Set up environment variables for the Cloud Function"
echo "4. Test the deployment at quotelinker.com"
