const { validationResult } = require('express-validator');
const db = require('../config/db');

/**
 * @desc    Register Uer
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = (req, res) => {
  const errors = validationResult(req);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password, location } = req.body;

  if (!location) {
    location = 'point(35.120529 33.938452)';
  } else {
    const points = location.split(',');
    location = `point(${points[0]} ${points[1]})`;
  }

  // TODO: Sanitize the req.body parameters
  db.query(
    {
      text: `INSERT INTO users(name, email, password, location) VALUES('${name}','${email}','${password}','${location}') RETURNING *`,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      console.log(data);
      return res.status(200).json({ success: true, user: data.rows[0] });
    }
  );
};
