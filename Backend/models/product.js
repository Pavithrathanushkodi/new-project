const db = require('../db');

const Product = {
  
  getAllProducts: async () => {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  },


  getProductById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  addProduct: async (name, price) => {
    const [result] = await db.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return result.insertId;
  },

  updateProductPrice: async (id, newPrice) => {
    const [result] = await db.execute('UPDATE products SET price = ? WHERE id = ?', [newPrice, id]);
    return result.affectedRows;
  },

  deleteProduct: async (id) => {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Product;
