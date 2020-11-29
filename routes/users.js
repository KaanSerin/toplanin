const express = require('express');
const { getAllUsers, updateAvatar } = require('../controllers/users');

const router = express.Router();

router.route('/').get(getAllUsers);
router.post('/:id/avatar', updateAvatar);

module.exports = router;
