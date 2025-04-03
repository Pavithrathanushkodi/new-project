const meterReadingService = require("../services/meterReadingService");

const getAllMeterReadings = async (req, res) => {
  try {
    const readings = await meterReadingService.getMeterReadings();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMeterReading = async (req, res) => {
  const { id } = req.params;
  const { newMeterValue } = req.body;

  try {
    const updatedReading = await meterReadingService.updateMeterReading(id, newMeterValue);
    res.status(200).json(updatedReading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllMeterReadings, updateMeterReading };
