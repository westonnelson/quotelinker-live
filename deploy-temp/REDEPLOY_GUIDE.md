# 🚀 REDEPLOY GUIDE - Fix AI Chat Function

## The Problem
Your AI chat is getting a 404 error because the Netlify function wasn't deployed with your initial deployment. We need to redeploy the entire project including the `netlify/functions` directory.

## Quick Fix - Redeploy via Drag & Drop

### Step 1: Kill Any Netlify CLI Session
If you have a Netlify CLI session running, close your terminal and open a new one.

### Step 2: Create Clean Deployment Folder
```bash
cd /Users/weston/quotelinker-live
mkdir -p /tmp/quotelinker-deploy
cp -r * /tmp/quotelinker-deploy/ 2>/dev/null || true
cp -r .env /tmp/quotelinker-deploy/ 2>/dev/null || true
rm -rf /tmp/quotelinker-deploy/.git
rm -rf /tmp/quotelinker-deploy/node_modules
rm -f /tmp/quotelinker-deploy/*.md
rm -f /tmp/quotelinker-deploy/deploy*.sh
rm -f /tmp/quotelinker-deploy/quick-deploy.sh
```

### Step 3: Verify Function Files Are Included
```bash
ls -la /tmp/quotelinker-deploy/netlify/functions/
```
You should see:
- `ai-chat.js`
- `package.json`
- `submit-lead.js`

### Step 4: Open Deployment Folder
```bash
open /tmp/quotelinker-deploy
```

### Step 5: Redeploy to Netlify
1. Go to your Netlify dashboard: https://app.netlify.com/sites/bespoke-paprenjak-d83b63/deploys
2. Click **"Deploys"** tab
3. Drag the entire `/tmp/quotelinker-deploy` folder onto the deploy area
4. Wait for deployment to complete

### Step 6: Test AI Chat
Once deployed, test the AI chat at: https://bespoke-paprenjak-d83b63.netlify.app/

The function should now be available at: `/.netlify/functions/ai-chat`

## Alternative: Command Line Deploy

If the drag & drop doesn't work:

```bash
cd /tmp/quotelinker-deploy
npx netlify-cli deploy --prod --dir . --site bespoke-paprenjak-d83b63
```

## ✅ Success Indicators
- AI chat works without 404 errors
- Function appears in Netlify dashboard under "Functions" tab
- Console shows successful API responses

## Next Steps After Fix
1. Test AI chat functionality
2. Connect custom domain (quotelinker.com)
3. Test on mobile devices
4. Final production verification
