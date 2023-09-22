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
                    content: "You are a helpful assistant."
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
