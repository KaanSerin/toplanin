const { validationResult } = require('express-validator');
const db = require('../config/db');
const moment = require('moment');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendMail } = require('../utility/mail');

/**
 * @desc    Register User
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password, location } = req.body;

  // Hash password before storing it in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!location) {
    location = 'point(35.120529 33.938452)';
  } else {
    const points = location.split(',');
    location = `point(${points[0]} ${points[1]})`;
  }

  try {
    // TODO: Sanitize the req.body parameters
    const { rows } = await db.query(
      `INSERT INTO users(name, email, password, location) VALUES('${name}','${email}','${hashedPassword}','${location}') RETURNING user_id, name, email, location`
    );

    const token = jwt.sign(
      { user_id: rows[0].user_id },
      process.env.JWT_SECRET
    );

    res.cookie('auth', token);

    sendMail(email, 'Confirm Account', 'auth/register/confirm', token);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    if (+error.code === 23505) {
      return res
        .status(500)
        .json({ error: { detail: `User with email ${email} already exists` } });
    }
    return res.status(500).json({ error });
  }
};

/**
 * @desc    Login Uer
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { rows } = await db.query(
      `SELECT user_id, email, password FROM users WHERE email = '${email}'`
    );
    if (rows.length == 0) {
      return res.status(404).json({ msg: 'Invalid username or password' });
    }

    const isSame = bcrypt.compareSync(password, rows[0].password);

    // passwords match it's all good
    if (isSame == true) {
      const token = jwt.sign(
        { user_id: rows[0].user_id },
        process.env.JWT_SECRET
      );

      res.cookie('auth', token);

      return res.status(200).json({ success: true, token: token });
    } else {
      return res.status(404).json({ msg: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/**
 * @desc    Complete Registration
 * @route   GET /api/register/:token
 * @access  Public
 */
exports.confirmAccount = async (req, res) => {
  const token = req.params.token;

  const tokenParsed = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenParsed);

  try {
    const { rows } = await db.query(
      `SELECT user_id, name, confirmed, password FROM users WHERE user_id = '${tokenParsed.user_id}'`
    );

    // user not found
    if (rows.length == 0) {
      return res.status(400).json({ msg: 'Bad Request' });
    }

    // if the account is already confirmed
    if (rows[0].confirmed === true) {
      return res.status(400).json({ msg: 'Bad Request' });
    } else {
      // God forgive me for what I'm doing here...
      const data = await db.query(
        `UPDATE users SET confirmed = 'true' WHERE user_id = '${tokenParsed.user_id}'`
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/**
 * @desc    Logout Uer
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = (req, res) => {
  if (!req.cookies.auth) {
    return res.status(400).json({ success: false });
  }
  res.cookie('auth', '', { maxAge: 0 });
  res.status(200).json({ success: true });
};

/**
 * @desc    Initial Setup User Account Details
 * @route   POST /api/auth/complete
 * @access  Private
 */
exports.completeRegistration = async (req, res) => {
  const errors = validationResult(req);

  const { reason, interests, groups } = req.body;

  console.log(reason, interests, groups);

  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = req.cookies.auth;

  if (!token) {
    return res.status(400).json({ success: false });
  }

  const tokenParsed = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenParsed);

  try {
    const { rows } = await db.query(
      `SELECT user_id, name, confirmed, completed, password FROM users WHERE user_id = '${tokenParsed.user_id}'`
    );

    // user not found
    if (rows.length == 0) {
      return res.status(400).json({ success: false, error: 'Bad Request' });
    }

    // if the account is not confirmed
    if (rows[0].confirmed !== true) {
      return res.status(400).json({ success: false, error: 'Bad Request' });
    }

    // if the account is already confirmed
    if (rows[0].completed === true) {
      return res.status(400).json({ success: false, error: 'Bad Request' });
    } else {
      const data = await db.query(
        `UPDATE users SET completed = 'true', reason_join = '${reason}', interests = '${interests}', groups = '${groups}' WHERE user_id = '${tokenParsed.user_id}'`
      );

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/**
 * @desc    Forgot Password Request
 * @route   POST /api/auth/resetpassword
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  const { email } = req.body;

  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: { msg: 'User not found' } });
    }

    const user_id = rows[0].user_id;

    // Send this token to user email
    const token = crypto.randomBytes(50).toString('hex');

    const webtoken = jwt.sign({ user_id, token }, process.env.JWT_SECRET);

    const salt = await bcrypt.genSalt(10);
    // Store this encrypted token in the database
    const hash = await bcrypt.hash(token, salt);

    const now = moment().add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    console.log(now);

    let data = await db.query(
      `SELECT * FROM user_password_reset WHERE user_id = '${user_id}'`
    );
    data = data.rows;
    if (data.length === 0) {
      const data = await db.query(
        `INSERT INTO user_password_reset VALUES('${user_id}', '${hash}', '${now}')`
      ).rows;

      sendMail(email, 'Reset Password', 'auth/resetpassword/', webtoken);
    } else {
      const data = await db.query(
        `UPDATE user_password_reset SET reset_token = '${hash}', reset_token_expire = '${now}' WHERE user_id = '${user_id}'`
      ).rows;

      sendMail(email, 'Reset Password', 'auth/resetpassword', webtoken);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/**
 * @desc    Forgot Password Reset
 * @route   POST /api/auth/resetpassword/:token
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  const { password } = req.body;

  const webtoken = req.params.token;
  if (!webtoken) {
    return res.status(400).json({ success: false });
  }

  const { user_id, token } = jwt.verify(webtoken, process.env.JWT_SECRET);

  if (errors.errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user_password_reset = await db.query(
      `SELECT * FROM user_password_reset WHERE user_id = '${user_id}'`
    );
    user_password_reset = user_password_reset.rows;

    // if the res
    if (user_password_reset.length === 0) {
      return res.status(400).json({});
    }

    // If there is not reset token
    if (user_password_reset[0].reset_token === null) {
      return res.status(400).json({});
    }

    const { reset_token, reset_token_expire } = user_password_reset[0];

    const isSame = await bcrypt.compare(
      token,
      user_password_reset[0].reset_token
    );

    // If the reset token and the encrypted database token are not the same
    if (!isSame) {
      return res.status(400).json({});
    }

    // If the reset token has expired
    if (!moment(user_password_reset[0].reset_token_expire) > moment()) {
      return res.status(400).json({});
    }

    // Hash password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { rows } = await db.query(
      `UPDATE users SET password = '${hashedPassword}' WHERE user_id = '${user_id}'`
    );

    await db.query(
      `UPDATE user_password_reset SET reset_token = null, reset_token_expire = null WHERE user_id = '${user_id}'`
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
