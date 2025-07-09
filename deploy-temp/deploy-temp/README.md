# QuoteLinker - Insurance, instantly.

A modern AI-optimized InsurTech marketplace that revolutionizes insurance lead generation through real-time auctions and predictive nurturing.

## Features

- 🏠 **Multi-Insurance Coverage**: Home, Auto, Life, and Health insurance quotes
- 🤖 **AI-Powered Explanations**: Get instant, simple explanations of insurance terms
- ⚡ **60-Second Quotes**: Fast, streamlined quote process
- 📱 **Mobile-First Design**: Responsive design that works on all devices
- 🎯 **Smart Lead Generation**: Intelligent funnel system for better conversions

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Google Cloud Functions (Node.js)
- **Email**: Nodemailer with Gmail integration
- **AI**: Google Gemini API for insurance explanations

## Local Development

1. Open `index.html` in a web browser
2. For the AI feature, add your Google Gemini API key to the JavaScript
3. To test the backend function locally, see the `functions/` directory

## Production Deployment

### Frontend (Static Site)
Deploy to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

### Backend (Google Cloud Functions)
```bash
cd functions
gcloud functions deploy leadNotification --runtime nodejs18 --trigger-http --allow-unauthenticated
```

### Environment Variables
Set these in your cloud function:
- `EMAIL_USER`: Gmail address for sending notifications
- `EMAIL_PASS`: Gmail app password
- `NOTIFICATION_EMAIL`: Email to receive lead notifications

## Custom Domain Setup

To deploy to quotelinker.com:

1. **DNS Configuration**: Point your domain to your hosting provider
2. **SSL Certificate**: Enable HTTPS (most hosting providers handle this automatically)
3. **Environment Variables**: Update any hardcoded URLs to use your domain

## File Structure

```
quotelinker-live/
├── index.html          # Main application
├── logo.png           # Primary logo
├── favicon.ico        # Browser icon
├── favicon.svg        # Modern SVG favicon
├── manifest.json      # PWA manifest
└── functions/         # Backend cloud function
    ├── index.js       # Email notification handler
    └── package.json   # Node.js dependencies
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2025 QuoteLinker LLC. All rights reserved.
