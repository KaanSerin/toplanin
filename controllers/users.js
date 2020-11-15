const db = require('../config/db');

/**
 * @desc    Get All Users
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.getAllUsers = async (req, res) => {
  let users = await db.query({
    text: 'SELECT * FROM users;',
  });

  users = users.rows;

  res.status(200).json({ success: true, users });
};
