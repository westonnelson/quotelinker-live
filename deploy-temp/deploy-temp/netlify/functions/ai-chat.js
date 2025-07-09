const { GoogleGenerativeAI } = require('@google/generative-ai');

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
    const { question } = JSON.parse(event.body);
    
    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Question is required' }),
      };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert insurance advisor. Explain the insurance term or concept "${question}" in two simple, easy-to-understand paragraphs. Use friendly language and avoid complex jargon. Address the user as someone who is new to insurance and wants to learn.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        response: text 
      }),
    };

  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      }),
    };
  }
};
