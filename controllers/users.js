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

  console.log(users);

  users = users.rows;

  //   const r = await db.query({ text: '\\dt' });
  //   console.log(r);

  res.status(200).json({ success: true, users });
};
