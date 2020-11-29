const { validationResult } = require('express-validator');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utility/mail');

/**
 * @desc    Register Uer
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

  // TODO: Sanitize the req.body parameters
  db.query(
    {
      text: `INSERT INTO users(name, email, password, location) VALUES('${name}','${email}','${hashedPassword}','${location}') RETURNING user_id, name, email, location`,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const token = jwt.sign(
        { user_id: data.rows[0].user_id },
        process.env.JWT_SECRET
      );

      res.cookie('auth', token);

      sendMail(email, token);
      return res.status(200).json({ success: true });
    }
  );
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

  db.query(
    {
      text: `SELECT user_id, email, password FROM users WHERE email = '${email}'`,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (data.rows.length == 0) {
        return res.status(404).json({ msg: 'Invalid username or password' });
      }

      const isSame = bcrypt.compareSync(password, data.rows[0].password);

      // passwords match it's all good
      if (isSame == true) {
        const token = jwt.sign(
          { user_id: data.rows[0].user_id },
          process.env.JWT_SECRET
        );

        res.cookie('auth', token);

        return res.status(200).json({ success: true, token: token });
      } else {
        return res.status(404).json({ msg: 'Invalid username or password' });
      }
    }
  );
};

/**
 * @desc    Complete Registration
 * @route   GET /api/register/:token
 * @access  Public
 */
exports.confirmAccount = (req, res) => {
  const token = req.params.token;

  const tokenParsed = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenParsed);

  db.query(
    {
      text: `SELECT user_id, name, confirmed, password FROM users WHERE user_id = '${tokenParsed.user_id}'`,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      // user not found
      if (data.rows.length == 0) {
        return res.status(400).json({ msg: 'Bad Request' });
      }

      // if the account is already confirmed
      if (data.rows[0].confirmed === true) {
        return res.status(400).json({ msg: 'Bad Request' });
      } else {
        // God forgive me for what I'm doing here...
        db.query(
          {
            text: `UPDATE users SET confirmed = 'true' WHERE user_id = '${tokenParsed.user_id}'`,
          },
          (err, data) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
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

  db.query(
    {
      text: `SELECT user_id, name, confirmed, completed, password FROM users WHERE user_id = '${tokenParsed.user_id}'`,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      // user not found
      if (data.rows.length == 0) {
        return res.status(400).json({ success: false, error: 'Bad Request' });
      }

      // if the account is not confirmed
      if (data.rows[0].confirmed !== true) {
        return res.status(400).json({ success: false, error: 'Bad Request' });
      }

      // if the account is already confirmed
      if (data.rows[0].completed === true) {
        return res.status(400).json({ success: false, error: 'Bad Request' });
      } else {
        // God forgive me for what I'm doing here...
        db.query(
          {
            text: `UPDATE users SET completed = 'true', reason_join = '${reason}', interests = '${interests}', groups = '${groups}' WHERE user_id = '${tokenParsed.user_id}'`,
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ success: false, error: err });
            }
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
};
