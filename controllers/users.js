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

/**
 * @desc    Update User Avatar
 * @route   POST /api/users/:id/avatar
 * @access  Public
 */
exports.updateAvatar = async (req, res) => {
  console.log(req.body);
  let users = await db.query({
    text: 'SELECT * FROM users;',
  });

  users = users.rows;

  res.status(200).json({ success: true, users });
};
