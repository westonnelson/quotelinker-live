# 🚀 QuoteLinker LIVE Deployment Guide

Get QuoteLinker live on quotelinker.com with full AI functionality in under 10 minutes!

## Prerequisites

1. **Netlify Account** (free): https://netlify.com
2. **Google AI Studio API Key** (free): https://aistudio.google.com/app/apikey
3. **Gmail Account** (for lead notifications)

## Quick Deployment Steps

### 1. Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

### 2. Navigate to your project directory
```bash
cd /Users/weston/quotelinker-live
```

### 3. Install function dependencies
```bash
cd netlify/functions
npm install
cd ../..
```

### 4. Deploy to Netlify
```bash
# Login to Netlify
netlify login

# Deploy the site
netlify deploy --prod --dir=.
```

### 5. Set up Environment Variables in Netlify Dashboard

Go to your Netlify site dashboard → Site settings → Environment variables

Add these variables:

1. **GEMINI_API_KEY**: Your Google AI Studio API key
   - Get from: https://aistudio.google.com/app/apikey
   
2. **EMAIL_USER**: Your Gmail address (for sending notifications)
   - Example: your-email@gmail.com
   
3. **EMAIL_PASS**: Your Gmail App Password
   - Go to Google Account → Security → App passwords
   - Generate a new app password for "Mail"
   
4. **NOTIFICATION_EMAIL**: Where to receive lead notifications
   - Can be the same as EMAIL_USER

### 6. Configure Custom Domain

In Netlify dashboard:
1. Go to Site settings → Domain management
2. Add custom domain: `quotelinker.com`
3. Follow DNS configuration instructions

### 7. Test on Your Phone!

Once deployed, visit your site and test:
- ✅ AI chat functionality
- ✅ Quote forms
- ✅ Responsive design
- ✅ All page links

## Alternative: One-Command Deployment

Run our automated deployment script:

```bash
./deploy-netlify.sh
```

## Environment Variables Setup Details

### Getting Gemini API Key:
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key and add to Netlify environment variables

### Gmail App Password:
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate new password for "Mail"
5. Use this password (not your regular Gmail password)

## Troubleshooting

### Functions not working?
- Check that `netlify/functions` directory exists
- Verify environment variables are set
- Check function logs in Netlify dashboard

### AI responses not working?
- Verify GEMINI_API_KEY is correct
- Check function logs for errors
- Test API key at https://aistudio.google.com

### Email notifications not working?
- Verify Gmail credentials
- Check spam folder
- Enable "Less secure app access" if needed

## Success Checklist

- [ ] Site deploys without errors
- [ ] Custom domain configured
- [ ] AI chat responds to questions
- [ ] Quote forms submit successfully
- [ ] Email notifications arrive
- [ ] Mobile responsive design works
- [ ] All page links function

## Support

If you need help:
1. Check Netlify function logs
2. Test environment variables
3. Verify API credentials

🎉 Your QuoteLinker should now be live at quotelinker.com!
