const db = require('../db');

const Nozzle = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM nozzle_data');
    return rows;
  },

  getByNozzleName: async (nozzleName) => {
    const [rows] = await db.execute('SELECT * FROM nozzle_data WHERE nozzle_name = ?', [nozzleName]);
    return rows[0];
  },

  updateNozzle: async (id, petrolOld, petrolNew, dieselOld, dieselNew) => {
    const petrolSalesQty = petrolNew - petrolOld;
    const dieselSalesQty = dieselNew - dieselOld;
    const petrolSalesValue = petrolSalesQty * 100; // Assuming 100 per litre
    const dieselSalesValue = dieselSalesQty * 90;  // Assuming 90 per litre

    const [result] = await db.execute(
      `UPDATE nozzle_data 
       SET petrol_old = ?, petrol_new = ?, diesel_old = ?, diesel_new = ?, 
           petrol_sales_qty = ?, petrol_sales_value = ?, 
           diesel_sales_qty = ?, diesel_sales_value = ?, 
           updated_at = NOW()
       WHERE id = ?`,
      [
        petrolOld, petrolNew,
        dieselOld, dieselNew,
        petrolSalesQty, petrolSalesValue,
        dieselSalesQty, dieselSalesValue,
        id
      ]
    );

    return result.affectedRows;
  },

  insertNozzle: async (nozzleName) => {
    const [result] = await db.execute(
      `INSERT INTO nozzle_data 
       (nozzle_name, petrol_old, petrol_new, diesel_old, diesel_new, updated_at) 
       VALUES (?, 0, 0, 0, 0, NOW())`,
      [nozzleName]
    );
    return result.insertId;
  },

  
    getSalesSummary: async () => {
      const [rows] = await db.execute(`
        SELECT 
          SUM(petrol_sales_qty) AS total_petrol_qty,
          SUM(petrol_sales_value) AS total_petrol_value,
          SUM(diesel_sales_qty) AS total_diesel_qty,
          SUM(diesel_sales_value) AS total_diesel_value
        FROM nozzle_data
      `);
      return rows[0];
    }
  };

module.exports = Nozzle;
