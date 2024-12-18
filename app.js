const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission and send the email
app.post('/send-email', (req, res) => {
    const { email } = req.body;

    // Create the transporter (using Gmail in this case)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ojoabiodun627@gmail.com', // Replace with your Gmail address
            pass: 'ojoabiodun123', // Replace with your Gmail password (or app password if 2FA is enabled)
        },
    });

    // Email options
    const mailOptions = {
        from: 'ojoabiodun627@gmail.com', // Sender address
        to: email, // Recipient address
        subject: 'Test Email from Node.js', // Subject of the email
        text: 'This is a test email sent from Node.js using Nodemailer from Phenomenal!', // Body of the email
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send('Error sending email');
        }
        res.send('Email sent successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
