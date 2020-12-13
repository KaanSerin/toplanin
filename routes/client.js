const express = require('express');
const { getClientInfo } = require('../controllers/client');

const router = express.Router();

router.get('/getInfo/:ip', getClientInfo);

module.exports = router;
