const express = require('express');
const { check } = require('express-validator');
const {
  register,
  loginUser,
  logout,
  completeRegistration,
  confirmAccount,
  resetPassword,
  forgotPassword,
} = require('../controllers/auth');

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
router.get('/register/confirm/:token', confirmAccount);
router.post(
  '/register/complete',
  [
    check('reason', 'Please provide a reason for joining').not().isEmpty(),
    check('interests', 'Please provide at least 3 interests').isArray({
      min: 3,
    }),
    check('groups', 'Please select at least one group to join').isArray({
      min: 1,
    }),
  ],
  completeRegistration
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
router.post(
  '/forgotpassword',
  check('email', 'Please provide email').isEmail(),
  forgotPassword
);
router.post(
  '/resetpassword/:token',
  check('password', 'Please provide new password').notEmpty(),
  resetPassword
);

module.exports = router;
