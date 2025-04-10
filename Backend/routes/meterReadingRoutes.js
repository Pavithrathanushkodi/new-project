const express = require('express');
const router = express.Router();
const meterReadingController = require('../controllers/meterReadingController');

// Get all meter readings
router.get('/', meterReadingController.getAllMeterReadings);

// Insert new meter reading (if no record exists for a nozzle)
router.post('/insert', meterReadingController.insertMeterReading);

// Update meter reading for a specific nozzle
// Add route to handle bulk updates
router.put('/update-all', meterReadingController.updateAllMeterReadings);


module.exports = router;
