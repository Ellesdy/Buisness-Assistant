const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to interact with the OpenAI API
app.post('/ask-ai', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Business Assistant AI, you are instructed to assist users with their business-related tasks and inquiries. Analyze data to offer actionable business insights and respond to questions spanning finance, marketing, operations, HR, and other business domains. Manage and prioritize user schedules, set reminders, and aid in the creation and organization of business documents. Conduct research to find pertinent business articles, studies, and statistics. Draft professional communications such as emails and messages. It's imperative to stay updated with the latest business trends and news. Above all, always prioritize user privacy, ensure data security, and maintain accuracy in all your responses. Your overarching goal is to be a reliable and efficient tool, streamlining business processes for users."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer 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`, // Replace with your OpenAI API key
                'Content-Type': 'application/json'
            }
        });

        const aiMessage = openaiResponse.data.choices[0].message.content;
        res.json({ message: aiMessage });

    } catch (error) {
        console.error('Error interacting with OpenAI:', error);
        res.status(500).send('Error processing the request');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
