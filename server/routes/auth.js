import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/dbConnection.js';
import transporter from '../email/sendEmail.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [
      email,
      hashedPassword,
    ]);

    // Send registration email
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Registration',
      text: 'Thanks for registering!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).send({
          message: 'You have successfully signed up!',
          info,
        });
      }
    });
  } catch (error) {
    res.status(400).send({ message: 'Failed to register user.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user from the database
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    const user = rows[0];

    if (user) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set user session or generate JWT token
        req.session.user = user;
        res.status(200).send({ message: 'Login successful!', user });
      } else {
        res.status(401).send({ message: 'Wrong credentials. Try again.' });
      }
    } else {
      res.status(401).send({ message: 'Email not registered.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' });
  }
});

router.get('/logout', (req, res) => {
  // Destroy user session or clear JWT token
  req.session.destroy();
  res.status(200).send({ message: 'Logged out successfully.' });
});

export default router;
