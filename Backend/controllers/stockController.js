const Stock = require('../models/stockModel');
const db = require('../db');

// Get nozzles by product type
const getNozzles = async (req, res) => {
  try {
    const { productType } = req.query;
    if (!productType) return res.status(400).json({ message: "productType is required" });

    const nozzles = await Stock.getNozzleNamesByProductType(productType);
    res.json(nozzles);
  } catch (error) {
    console.error('Error fetching nozzles:', error);
    res.status(500).json({ message: 'Error fetching nozzle names', error });
  }
};

// Add or update stock
const addStock = async (req, res) => {
  const { nozzleName, productType, addedStock, dailySales } = req.body;

  if (!nozzleName || !productType || !addedStock || addedStock <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await Stock.insertOrUpdateStock({ nozzleName, productType, addedStock, dailySales });
    res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Failed to update stock', error });
  }
};

// Get product types
const getProductTypes = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT DISTINCT product_type FROM stock');
    const productTypes = rows.map(row => row.product_type);
    res.json(productTypes);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Failed to get product types" });
  }
};

// Get stock history
const getStockHistory = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    let query = `SELECT product_type, nozzle_name, stock_added, date FROM stock WHERE 1=1`;
    const params = [];

    if (startDate && endDate) {
      query += ` AND date BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    } else {
      query += ` AND date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)`;
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching stock history:", error);
    res.status(500).json({ message: "Failed to fetch stock history" });
  }
};

const updateSalesFromMeterReadings = async (req, res) => {
  try {
    // Fetch all relevant meter readings
    const [readings] = await db.execute('SELECT nozzle_name, petrol_old, petrol_new, diesel_old, diesel_new FROM meter_reading');

    for (const reading of readings) {
      const petrolSalesQty = reading.petrol_new - reading.petrol_old;
      const dieselSalesQty = reading.diesel_new - reading.diesel_old;

      // Update PETROL sales
      await db.execute(`
        UPDATE stock
        SET today_sales = ?
        WHERE nozzle_name = ? AND product_type = 'petrol'
      `, [petrolSalesQty, reading.nozzle_name]);

      // Update DIESEL sales
      await db.execute(`
        UPDATE stock
        SET today_sales = ?
        WHERE nozzle_name = ? AND product_type = 'diesel'
      `, [dieselSalesQty, reading.nozzle_name]);
    }

    res.json({ message: 'Today\'s sales updated from meter readings successfully.' });
  } catch (error) {
    console.error('Error updating today_sales from meter readings:', error);
    res.status(500).json({ message: 'Failed to update today_sales', error });
  }
};


module.exports = {
  getNozzles,
  addStock,
  getProductTypes,
  getStockHistory,
  updateSalesFromMeterReadings,
};
