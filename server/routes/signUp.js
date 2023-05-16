const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const db = require('../db/dbConnection');

// Validation schema
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

router.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(async (req, res, next) => {
    try {
      const result = userSchema.validate(req.body);
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.');
        res.redirect('/users/register');
        return;
      }
      const { email, username, password } = result.value;

      // Check if the email is already in use
      const emailQuery = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.query(emailQuery, [email]);
      if (rows.length > 0) {
        req.flash('error', 'Email is already in use.');
        res.redirect('/users/register');
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertQuery = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
      await db.query(insertQuery, [email, username, hashedPassword]);

      req.flash('success', 'Registration successful. Please log in.');
      res.redirect('/users/login');
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

