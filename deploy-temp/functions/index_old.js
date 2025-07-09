const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

functions.http('leadNotification', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send(''); return;
    }

    const leadData = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New QuoteLinker Lead: ${leadData.funnelType}`,
        html: `<p>A new lead has been submitted:</p><pre>${JSON.stringify(leadData, null, 2)}</pre>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error processing lead notification.');
    }
});
