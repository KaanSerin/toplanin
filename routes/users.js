const express = require('express');
const {
  getAllUsers,
  updateAvatar,
  getUserInfoById,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserInfoById);
router.post('/avatar', protect, updateAvatar);

module.exports = router;
