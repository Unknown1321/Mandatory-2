const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '1234@gmail.com',
      pass: '123456',
    },
  });

  async function sendEmail(to, subject, message) {
    try {
      const mailOptions = {
        from: '1234@gmail.com',
        to,
        subject,
        text: message,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

module.exports = {sendEmail, transporter};  