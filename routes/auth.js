const express = require('express');
const { check } = require('express-validator');
const { register, loginUser, logout } = require('../controllers/auth');

const router = express.Router();

router
  .route('/register')
  .post(
    [
      check('name', 'Please provide your full name').not().isEmpty(),
      check('email', 'Please provide a valid address').isEmail(),
      check(
        'password',
        'Please provide a password that is at least 6 characters'
      ).isLength({ min: 6 }),
    ],
    register
  );

router.post(
  '/login',
  [
    check('email', 'Please provide a valid address').isEmail(),
    check('password', 'Please provide a password that is at least 6 characters')
      .not()
      .isEmpty(),
  ],
  loginUser
);

router.post('/logout', logout);

module.exports = router;
