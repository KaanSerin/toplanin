const express = require('express');
const { getEventCategories } = require('../controllers/events');

const router = express.Router();

router.get('/eventcategories', getEventCategories);

module.exports = router;
