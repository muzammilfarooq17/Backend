require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

module.exports = transporter;

//smtp servers sai contact kai lye humai yai Nodemailler setup rkna prta hia . usk
// uskai lye yai 4 cheze chaiye:::

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

// -----------------------------------------------------------------------------
// **SMTP server** ka matlab hai **Simple Mail Transfer Protocol server**.

// Ye mainly **email send karne** ke liye use hota hai.

// ### Simple example

// Tumhare Node.js backend se email send karni hai:

// ```text
// Your Backend
//      ↓
//    SMTP
//      ↓
// Gmail SMTP Server
//      ↓
//    User's Email
// ```

// For Gmail, commonly:

// ```text
// SMTP Host: smtp.gmail.com
// Port: 587
// Security: TLS
// ```

// ### SMTP vs Gmail API

// | SMTP                                    | Gmail API                              |
// | --------------------------------------- | -------------------------------------- |
// | Email send karne ka standard protocol   | Gmail ki official API                  |
// | Nodemailer ke saath easily use hota hai | Google Cloud + OAuth setup chahiye     |
// | Simple email sending ke liye easy       | Gmail-specific features ke liye better |
// | `smtp.gmail.com` use kar sakte ho       | Google Cloud credentials required      |

// Agar tum **Node.js/Express mein OTP, verification email, password reset** bhejna chahte ho, to **Nodemailer + SMTP** beginner ke liye kaafi easy option hai.
