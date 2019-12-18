const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');
const {
  isAuthenticated
} = require('../config/auth');

// Load Login Page
router.get('/login', isAuthenticated, (req, res) => res.render('login'));

// Load Register Page
router.get('/register', isAuthenticated, (req, res) => res.render('register'));

// Register user
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != confirmPassword) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email Id already exists'
        });
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success',
                  'Registered succesfully'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

module.exports = router;