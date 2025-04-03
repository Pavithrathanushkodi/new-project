const MeterReading = require("../models/meterReadingModel");

const getMeterReadings = async () => {
  try {
    const readings = await MeterReading.findAll();
    return readings;
  } catch (error) {
    throw error;
  }
};

const updateMeterReading = async (id, newMeterValue) => {
  try {
    const reading = await MeterReading.findByPk(id);
    if (!reading) {
      throw new Error("Meter reading not found");
    }
    reading.new_meter_value = newMeterValue;
    await reading.save();
    return reading;
  } catch (error) {
    throw error;
  }
};

module.exports = { getMeterReadings, updateMeterReading };
