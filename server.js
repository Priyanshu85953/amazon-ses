const express = require('express');
const cors = require('cors');  // Import the CORS package
const bodyParser = require('body-parser');
const sendMail = require('./sendmail.js');

const app = express();

// Use CORS and allow requests from any origin
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Replace this with your frontend URL if different
}));
app.use(bodyParser.json());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { recipientEmail, name, emailBody } = req.body;

    try {
        await sendMail(recipientEmail, name, emailBody);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Error sending email');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
