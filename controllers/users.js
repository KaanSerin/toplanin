const db = require('../config/db');

/**
 * @desc    Get All Users
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.getAllUsers = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users;');

  res.status(200).json({ success: true, users: rows });
};

/**
 * @desc    Update User Avatar
 * @route   POST /api/users/avatar
 * @access  Public
 */
exports.updateAvatar = async (req, res) => {
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

  try {
    const {
      rows,
    } = await db.query(
      'UPDATE user_avatars SET avatar = $1 WHERE user_id = $2',
      [avatar64, req.user.user_id]
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

/**
 * @desc    Get User Info
 * @route   GET /api/users/:id
 * @access  Public
 */
exports.getUserInfoById = async (req, res) => {
  const user_id = req.params.id;

  try {
    const {
      rows,
    } = await db.query(
      'SELECT name, bio, interests, groups, facebook, twitter, linkedin, confirmed, completed FROM users WHERE user_id = $1',
      [user_id]
    );

    console.log(rows);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `User with id ${user_id} not found` });
    }

    // user found but, if the account is not confirmed
    if (rows[0].confirmed !== true) {
      return res
        .status(404)
        .json({ success: false, error: `User with id ${user_id} not found` });
    }

    // user found but, if the account is not completed
    if (rows[0].completed !== true) {
      return res
        .status(404)
        .json({ success: false, error: `User with id ${user_id} not found` });
    }

    const data = await db.query(
      'SELECT * from user_avatars WHERE user_id = $1',
      [user_id]
    );

    rows[0].avatar = data.rows[0].avatar;

    // To not show these to in the response
    rows[0].completed = undefined;
    rows[0].confirmed = undefined;

    return res.status(200).json({ success: true, user: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

/**
 * @desc    Get Logged In User Info
 * @route   GET /api/users/me
 * @access  Private
 */
exports.getLoggedInUserInformation = async (req, res) => {
  const { user_id } = req.user;

  try {
    const { rows } = await db.query('SELECT * FROM users WHERE user_id = $1', [
      user_id,
    ]);

    console.log(rows);

    const data = await db.query(
      'SELECT * from user_avatars WHERE user_id = $1',
      [user_id]
    );

    rows[0].avatar = data.rows[0].avatar;

    // To not show these to in the response
    rows[0].completed = undefined;
    rows[0].confirmed = undefined;

    return res.status(200).json({ success: true, user: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

/**
 * @desc    Update Logged In User Info
 * @route   PUT /api/users/me
 * @access  Private
 */
exports.updateLoggedInUserInformation = async (req, res) => {
  const { user_id } = req.user;

  // Constructing the update data string
  let partQuery = '';
  Object.keys(req.body).forEach(
    (key) => (partQuery += `${key}='${req.body[key]}', `)
  );
  partQuery = partQuery.slice(0, partQuery.length - 2);

  try {
    const {
      rows,
    } = await db.query(
      `UPDATE users SET ${partQuery} WHERE user_id = $1 RETURNING *`,
      [user_id]
    );

    console.log(rows);

    return res.status(200).json({ success: true, user: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
