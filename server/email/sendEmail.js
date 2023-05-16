const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'yous1321@stud.kea.dk',
      pass: '',
    },
  });

  async function sendEmail(to, subject, message) {
    try {
      const mailOptions = {
        from: 'yous1321@stud.kea.dk',
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

export default transporter;  