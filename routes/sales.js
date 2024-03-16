const express = require('express');
const { getSales } = require('../controllers/sales');
const router = express.Router();

router.route('/sales').get(getSales);

module.exports = router;
