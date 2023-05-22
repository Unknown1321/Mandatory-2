const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const db = require('../db/dbConnection');

// Validation schema
const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs');
  })
  .post(async (req, res, next) => {
    try {
      const result = loginSchema.validate(req.body);
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.');
        res.redirect('/login');
        return;
      }
      const { email, password } = result.value;

      // Retrieve the user from the database
      const selectQuery = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.query(selectQuery, [email]);
      const user = rows[0];

      if (user) {
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Set user session or generate JWT token
          req.session.user = user;
          req.session.isLoggedIn = true; // Set the login flag to true
          req.flash('success', 'Login successful!');
          res.redirect('/');
        } else {
          req.flash('error', 'Wrong credentials. Try again.');
          res.redirect('/login');
        }
      } else {
        req.flash('error', 'Email not registered.');
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

