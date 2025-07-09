const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Validate lead data
const validateLeadData = (data) => {
    const required = ['funnelType', 'firstName', 'lastName', 'email'];
    return required.every(field => data[field] && data[field].trim());
};

// Format lead data for email
const formatLeadEmail = (leadData) => {
    const { funnelType, firstName, lastName, email, ...otherData } = leadData;
    
    let details = '';
    Object.entries(otherData).forEach(([key, value]) => {
        if (value && key !== 'funnelType') {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            details += `<li><strong>${label}:</strong> ${value}</li>`;
        }
    });

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00EEFD; border-bottom: 2px solid #00EEFD; padding-bottom: 10px;">
                New ${funnelType} Insurance Lead
            </h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Insurance Type:</strong> ${funnelType}</p>
            </div>
            ${details ? `
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #333;">Additional Details</h3>
                <ul style="list-style: none; padding: 0;">
                    ${details}
                </ul>
            </div>` : ''}
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Received: ${new Date().toLocaleString()}
            </p>
        </div>
    `;
};

functions.http('leadNotification', async (req, res) => {
    // CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }

    try {
        const leadData = req.body;
        
        // Validate required fields
        if (!validateLeadData(leadData)) {
            res.status(400).send({ 
                success: false, 
                error: 'Missing required fields' 
            });
            return;
        }

        // Prepare email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
            subject: `QuoteLinker Lead: ${leadData.funnelType} - ${leadData.firstName} ${leadData.lastName}`,
            html: formatLeadEmail(leadData),
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log('Lead notification sent successfully:', leadData.email);
        res.status(200).send({ 
            success: true, 
            message: 'Lead submitted successfully' 
        });

    } catch (error) {
        console.error('Error processing lead:', error);
        res.status(500).send({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
});
