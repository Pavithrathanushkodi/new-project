const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockController');


router.get('/nozzles', controller.getNozzles);

router.post('/add', controller.addStock);
router.get('/products', controller.getProductTypes);
router.get('/history', controller.getStockHistory);
router.put('/update-sales-from-meter', controller.updateSalesFromMeterReadings);



module.exports = router;
