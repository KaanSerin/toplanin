const db = require('../config/db');
const jwt = require('jsonwebtoken');

/**
 * @desc:   Basic authentication protection middleware
 */

exports.protect = async (req, res, next) => {
  const auth = req.cookies.auth;

  //   If no auth cookie return error
  if (!auth) {
    return res.status(400).json({ success: false, msg: 'Not authorized' });
  }

  const token = jwt.verify(auth, process.env.JWT_SECRET);

  // Attach the token information to req.user
  req.user = token;

  const { user_id } = token;

  try {
    const { rows } = await db.query(
      `SELECT user_id, confirmed, completed FROM users WHERE user_id = '${user_id}'`
    );

    // If the user_id in the cookie is not found in the database
    if (rows.length === 0) {
      return res.status(400).json({ success: false, msg: 'Not authorized' });
    }

    // If the user_id in the cookie is not found in the database or user is not verified
    else if (rows.length === 0 || rows[0].confirmed === false) {
      return res.status(400).json({ success: false, msg: 'Not authorized' });
    }

    // If the user_id in the cookie is found but not completed registration
    else if (rows[0].completed === false) {
      return res
        .status(400)
        .json({ success: false, msg: 'COMPLETE REGISTRATION' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server Error', error });
  }
};
