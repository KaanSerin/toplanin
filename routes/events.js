const express = require('express');
const { check } = require('express-validator');

const {
  getEventCategories,
  getEventSubcategories,
} = require('../controllers/events');

const router = express.Router();

router.get('/eventcategories', getEventCategories);
router.post(
  '/subcategories',
  [check('interests', 'Please send at least 1 interest').isLength({ min: 1 })],
  getEventSubcategories
);

module.exports = router;
