const express = require('express');
const { getAllUsers, updateAvatar } = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllUsers);
router.post('/avatar', protect, updateAvatar);

module.exports = router;
