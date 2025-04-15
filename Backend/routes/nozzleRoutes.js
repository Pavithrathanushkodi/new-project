const express = require('express');
const router = express.Router();
const controller = require('../controllers/nozzleController');

router.get('/', controller.getAllNozzles);
router.post('/insert', controller.insertNozzle);
router.put('/update-all', controller.updateAllNozzles);
router.get('/sales-summary', controller.getAllSalesSummary);

module.exports = router;
