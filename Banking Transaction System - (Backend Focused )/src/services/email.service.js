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

transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking Transaction System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Banking Transaction System – Let's Get Started!";

  const text = `Hello ${name},

Welcome to Banking Transaction System!

Your account has been successfully created, and we're excited to have you on board. You can now securely manage your transactions, track your balance, and access all our banking features in one place.

If you have any questions or need assistance getting started, our support team is always here to help.

Best regards,
The Banking Transaction Team`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 30px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:#0f4c81; padding: 28px 32px;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">Banking Transaction System</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <h2 style="color:#0f4c81; margin-top:0;">Welcome aboard, ${name}! 🎉</h2>
                <p style="color:#333333; font-size:15px; line-height:1.6;">
                  Thank you for registering with <strong>Banking Transaction System</strong>.
                  We're thrilled to have you join us!
                </p>
                <p style="color:#333333; font-size:15px; line-height:1.6;">
                  Your account is now active. You can start managing your transactions,
                  monitoring your balance, and enjoying secure, seamless banking — all in one place.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                  <tr>
                    <td style="border-radius:6px; background-color:#0f4c81;">
                      <a href="#" style="display:inline-block; padding: 12px 28px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; border-radius:6px;">
                        Go to Dashboard
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="color:#333333; font-size:15px; line-height:1.6;">
                  If you have any questions, feel free to reach out to our support team — we're always happy to help.
                </p>
                <p style="color:#333333; font-size:15px; line-height:1.6; margin-bottom:0;">
                  Best regards,<br>
                  <strong>The Banking Transaction Team</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f4f6f8; padding: 20px 32px; text-align:center;">
                <p style="color:#999999; font-size:12px; margin:0;">
                  This is an automated message. Please do not reply to this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  return await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendEmail,
};