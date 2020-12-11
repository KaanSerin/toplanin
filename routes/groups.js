const express = require('express');
const { check } = require('express-validator');
const { createGroup, getAllGroups } = require('../controllers/groups');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getAllGroups)
  .post(
    protect,
    [
      check('location', 'Please provide a location').notEmpty(),
      check('topics', 'Please provide at least one topic').isArray(),
      check('name', 'Please provide a group name').notEmpty(),
      check('about', 'Please provide information about the group').isLength({
        min: 50,
        max: 500,
      }),
      check('plan', 'Please choose a plan').isIn(['Standard', 'Pro']),
    ],
    createGroup
  );

module.exports = router;
