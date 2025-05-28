const express = require('express');
const router = express.Router();
const { customer } = require('../controllers/customerController');

router.post('/customer', customer);

module.exports = router;
