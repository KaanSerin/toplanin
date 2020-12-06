const express = require('express');
const {
  getAllUsers,
  updateAvatar,
  getUserInfoById,
  getLoggedInUserInformation,
  updateLoggedInUserInformation,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllUsers);
router
  .route('/me')
  .get(protect, getLoggedInUserInformation)
  .put(protect, updateLoggedInUserInformation);
router.route('/:id').get(getUserInfoById);
router.post('/avatar', protect, updateAvatar);

module.exports = router;
