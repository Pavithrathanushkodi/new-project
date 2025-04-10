const MeterReading = require('../models/meterReadingModel');

const getAllMeterReadings = async (req, res) => {
    try {
      const readings = await MeterReading.getAllMeterReadings();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
      const result = readings.map(reading => {
        const updatedDate = reading.updated_at.split('T')[0]; // Date part (YYYY-MM-DD)
  
        if (updatedDate === today) {
          // If it's today, show the old meter values
          return {
            ...reading,
            petrol_new_meter_value: '', // Empty input field for new values
            diesel_new_meter_value: '', // Empty input field for new values
          };
        } else {
          // If it's not today, show the old values and let them edit new ones
          return {
            ...reading,
            petrol_old_meter_value: reading.petrol_new_meter_value,
            diesel_old_meter_value: reading.diesel_new_meter_value,
          };
        }
      });
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching meter readings', error });
    }
  };
  
const updateAllMeterReadings = async (req, res) => {
    const readingsToUpdate = req.body; // Array of readings to be updated
  
    try {
      // Loop through each reading and update it
      for (const reading of readingsToUpdate) {
        const { id, petrolOld, petrolNew, dieselOld, dieselNew } = reading;
        await MeterReading.updateMeterReading(id, petrolOld, petrolNew, dieselOld, dieselNew);
      }
      res.json({ message: 'All meter readings updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating meter readings', error });
    }
  };
  
  
  

// Insert a new meter reading (initially set to 0)
const insertMeterReading = async (req, res) => {
  const { nozzleName } = req.body;

  try {
    const existingReading = await MeterReading.getMeterReadingByNozzle(nozzleName);
    if (existingReading) {
      res.status(400).json({ message: 'Meter reading already exists for this nozzle' });
    } else {
      const id = await MeterReading.insertMeterReading(nozzleName);
      res.status(201).json({ message: 'Meter reading inserted successfully', id });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error inserting meter reading', error });
  }
};

module.exports = { getAllMeterReadings, updateAllMeterReadings, insertMeterReading };
