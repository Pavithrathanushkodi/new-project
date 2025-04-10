const db = require('../db');

const MeterReading = {
  // Get all meter readings
  getAllMeterReadings: async () => {
    const [rows] = await db.execute('SELECT * FROM meter_reading');
    return rows;
  },

  // Get a specific meter reading by nozzle name
  getMeterReadingByNozzle: async (nozzleName) => {
    const [rows] = await db.execute('SELECT * FROM meter_reading WHERE nozzle_name = ?', [nozzleName]);
    return rows[0];
  },

  // Add or update meter reading
  updateMeterReading: async (id, petrolOld, petrolNew, dieselOld, dieselNew) => {
    const [result] = await db.execute(
      `UPDATE meter_reading 
      SET petrol_old_meter_value = ?, petrol_new_meter_value = ?, diesel_old_meter_value = ?, diesel_new_meter_value = ?, updated_at = NOW()
      WHERE id = ?`,
      [petrolOld, petrolNew, dieselOld, dieselNew, id]
    );
    return result.affectedRows;
  },

  // Insert a new meter reading (initially set to 0)
  insertMeterReading: async (nozzleName) => {
    const [result] = await db.execute(
      `INSERT INTO meter_reading (nozzle_name, petrol_old_meter_value, petrol_new_meter_value, diesel_old_meter_value, diesel_new_meter_value) 
      VALUES (?, 0, 0, 0, 0)`,
      [nozzleName]
    );
    return result.insertId;
  }
};

module.exports = MeterReading;
