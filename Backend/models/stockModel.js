const db = require('../db');

const Stock = {
  insertOrUpdateStock: async ({ nozzleName, productType, addedStock, dailySales }) => {
    const [rows] = await db.execute(
      'SELECT * FROM stock WHERE nozzle_name = ? AND product_type = ?',
      [nozzleName, productType]
    );

    if (rows.length > 0) {
      await db.execute(`
        UPDATE stock
        SET stock_added = stock_added + ?, today_sales = ?, date = NOW()
        WHERE nozzle_name = ? AND product_type = ?
      `, [addedStock, dailySales || 0, nozzleName, productType]);
    } else {
      await db.execute(`
        INSERT INTO stock (nozzle_name, product_type, stock_added, today_sales, date, created_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `, [nozzleName, productType, addedStock, dailySales || 0]);
    }
  },

  getNozzleNamesByProductType: async (productType) => {
    const [rows] = await db.execute(
      'SELECT DISTINCT nozzle_name FROM stock WHERE product_type = ?',
      [productType]
    );
    return rows.map(row => row.nozzle_name);
  },


};

module.exports = Stock;
