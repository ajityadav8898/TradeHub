const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

// Twilio setup for SMS
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate a random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Route to send OTP via SMS
app.post('/send-sms-otp', async (req, res) => {
    const { mobile } = req.body;
    const otp = generateOtp();

    try {
        await twilioClient.messages.create({
            body: `Your OTP for TradeHub is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile,
        });

        return res.status(200).json({ success: true, message: 'OTP sent to mobile', otp });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP', error });
    }
});

// Nodemailer setup for email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Route to send OTP via email
app.post('/send-email-otp', async (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'TradeHub OTP Verification',
        text: `Your OTP for TradeHub is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'OTP sent to email', otp });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
