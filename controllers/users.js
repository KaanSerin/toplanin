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
 * @route   POST /api/users/avatar
 * @access  Public
 */
exports.updateAvatar = async (req, res) => {
  let users = await db.query({
    text: 'SELECT * FROM users;',
  });

  if (!users) {
    users = users.rows;
  }

  if (users.length == 0) {
    return res.status(404).json({ success: false, error: 'User Not Found' });
  }

  const avatarByte = req.files.avatar;

  if (!avatarByte) {
    return res
      .status(400)
      .json({ success: false, error: 'Please upload an image file' });
  }

  if (avatarByte.size > process.env.MAX_AVATAR_SIZE) {
    return res
      .status(400)
      .json({ success: false, error: 'Avatar image should be under 3MB' });
  }

  const avatar64 = Buffer.from(avatarByte.data).toString('base64');

  db.query(
    {
      text: `UPDATE user_avatars SET avatar = '${avatar64}'`,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true });
    }
  );
};
