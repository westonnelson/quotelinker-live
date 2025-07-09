const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const leadData = JSON.parse(event.body);
    
    // Validate required fields
    const required = ['funnelType', 'firstName', 'lastName', 'email'];
    const isValid = required.every(field => leadData[field] && leadData[field].trim());
    
    if (!isValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }),
      };
    }

    // Initialize Supabase client (if configured)
    let supabase = null;
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    }

    // Store lead in database
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert([
            {
              ...leadData,
              created_at: new Date().toISOString(),
              status: 'new'
            }
          ])
          .select();

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Lead stored in database:', data);
        }
      } catch (dbError) {
        console.error('Database storage failed:', dbError);
        // Don't fail the entire request if database fails
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format lead data for email
    const { funnelType, firstName, lastName, email, ...otherData } = leadData;
    
    let details = '';
    Object.entries(otherData).forEach(([key, value]) => {
      if (value && key !== 'funnelType') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        details += `<li><strong>${label}:</strong> ${value}</li>`;
      }
    });

    const htmlContent = `
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

    // Prepare email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `QuoteLinker Lead: ${funnelType} - ${firstName} ${lastName}`,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('Lead notification sent successfully:', email);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Lead submitted successfully' 
      }),
    };

  } catch (error) {
    console.error('Error processing lead:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
    };
  }
};
