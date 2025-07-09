# 🚀 Deploy QuoteLinker Live - Quick Guide

## Step 1: Deploy to Netlify (2 minutes)

1. **Open Netlify Deploy**: Go to https://app.netlify.com/drop
2. **Drag & Drop**: Drag the entire `/Users/weston/quotelinker-live` folder to the deploy area
3. **Wait**: Netlify will build and deploy (takes ~30 seconds)
4. **Get URL**: Copy the generated URL (like `https://amazing-site-123456.netlify.app`)

## Step 2: Add Your Gemini API Key (1 minute)

1. In your new Netlify site dashboard, click **Site settings**
2. Go to **Environment variables** in the left menu
3. Click **Add variable**
4. Set:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
5. Click **Save**
6. Go to **Deploys** and click **Trigger deploy** → **Deploy site**

## Step 3: Connect Your Domain (5 minutes)

### In Netlify:
1. Go to **Domain settings** in your site dashboard
2. Click **Add custom domain**
3. Enter: `quotelinker.com`
4. Copy the Netlify URL they give you (e.g., `amazing-site-123456.netlify.app`)

### In Cloudflare:
1. Go to your Cloudflare dashboard
2. Select your `quotelinker.com` domain
3. Click **DNS** → **Records**
4. Delete any existing A or CNAME records for the root domain
5. Add a new **CNAME** record:
   - **Name**: `@` (or leave blank for root)
   - **Target**: Your Netlify URL (without https://)
   - **TTL**: Auto
6. Add another **CNAME** for www:
   - **Name**: `www`
   - **Target**: Your Netlify URL
   - **TTL**: Auto

## Step 4: Test Everything (2 minutes)

1. Wait 5-10 minutes for DNS to propagate
2. Visit `https://quotelinker.com`
3. Test the AI chat feature
4. Check on mobile

## 🎉 You're Live!

Your QuoteLinker app should now be fully functional at `quotelinker.com` with:
- ✅ Modern, responsive design
- ✅ Working Gemini AI chat
- ✅ All legal pages
- ✅ Strong SEO optimization
- ✅ Professional branding

---

**Need help?** If anything doesn't work:
1. Check Netlify function logs in your dashboard
2. Verify the API key is set correctly
3. Ensure DNS changes have propagated (use whatsmydns.net)
