# Deployment Configuration for quotelinker.com

## Option 1: Netlify Deployment (Recommended)

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `(none)`
   - Publish directory: `/`
3. **Custom Domain**: Add `quotelinker.com` in site settings
4. **Environment Variables**: Not needed for frontend-only deployment

## Option 2: Vercel Deployment

1. **Connect Repository**: Import project from Git
2. **Build Settings**: Auto-detected (static site)
3. **Custom Domain**: Add `quotelinker.com` in project settings
4. **Function Deployment**: Deploy `functions/index.js` as Vercel function

## Option 3: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

## Google Cloud Function Deployment

```bash
cd functions

# Deploy function
gcloud functions deploy leadNotification \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars EMAIL_USER="your-email@gmail.com" \
  --set-env-vars EMAIL_PASS="your-app-password" \
  --set-env-vars NOTIFICATION_EMAIL="leads@quotelinker.com"
```

## DNS Configuration

Point these records to your hosting provider:
- `A` record: `@` → Your hosting IP
- `CNAME` record: `www` → `quotelinker.com`

## SSL Certificate

Most hosting providers (Netlify, Vercel, Firebase) provide free SSL certificates automatically.

## API Keys Setup

For the AI feature to work, you'll need to:
1. Get a Google Gemini API key from Google AI Studio
2. Replace the empty `apiKey` variable in the JavaScript
3. Consider storing it securely (environment variables for server-side deployment)
