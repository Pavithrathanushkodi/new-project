const express = require("express");
const router = express.Router();
const meterReadingController = require("../controllers/meterReadingController");

router.get("/meter-readings", meterReadingController.getAllMeterReadings);
router.put("/meter-readings/:id", meterReadingController.updateMeterReading);

module.exports = router;
