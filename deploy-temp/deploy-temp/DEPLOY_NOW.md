# 🚀 QUICK DEPLOYMENT GUIDE - Get QuoteLinker Live in 5 Minutes!

## 📋 What You Need
- Your Gemini API key 
- Access to quotelinker.com domain (or use a temporary Netlify URL)

## 🔥 FASTEST PATH TO LIVE DEPLOYMENT

### Option 1: Manual Netlify Drag & Drop (FASTEST - 2 minutes!)

1. **Go to https://app.netlify.com/drop**
2. **Drag your entire `/Users/weston/quotelinker-live` folder** onto the drop zone
3. **Wait for deployment** (30 seconds)
4. **Add your Gemini API key:**
   - Go to Site Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your-actual-api-key`
5. **Redeploy** and you're LIVE!

### Option 2: GitHub + Netlify (Automatic deployment)

1. **Create GitHub repo:**
   ```bash
   # You already have git initialized!
   git remote add origin https://github.com/YourUsername/quotelinker-live.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - "New site from Git" → Choose GitHub → Select your repo
   - Build settings are already configured in `netlify.toml`
   - Add `GEMINI_API_KEY` environment variable

### Option 3: Command Line (for pros)
```bash
cd /Users/weston/quotelinker-live
netlify init  # Choose "QuoteLinker" → Name it "quotelinker"
netlify env:set GEMINI_API_KEY your-actual-gemini-key
netlify deploy --prod
```

## 🗝️ GET YOUR GEMINI API KEY

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with "AIza...")

## 🔧 YOUR FILES ARE READY!

✅ All pages work (`/`, `/learn.html`, `/agents.html`, `/privacy.html`, `/terms.html`)
✅ Gemini AI function is configured (`/netlify/functions/ai-chat.js`)
✅ SEO optimized with meta tags and structured data
✅ Mobile responsive design
✅ Professional branding with your logo

## 🎯 RECOMMENDED: Use Option 1 (Drag & Drop)

It's literally 2 minutes to get live:
1. Drag folder to https://app.netlify.com/drop
2. Add API key in settings
3. Test on your phone!

Your site will be live at a URL like: `https://amazing-einstein-123456.netlify.app`

Then you can add your custom domain `quotelinker.com` in the site settings.

## 🚨 NEED HELP?
- The site works perfectly without the API key (just the AI chat won't work)
- You can deploy first and add the API key later
- All other features (quote forms, navigation) work immediately

**GO DEPLOY NOW! 🚀**
