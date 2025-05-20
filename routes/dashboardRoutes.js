const express = require('express');
const router = express.Router();
const { getMetrics } = require('../controllers/metricsController');


router.get('/metrics', getMetrics);

module.exports = router;
