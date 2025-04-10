const db = require('../db');

// Product Model
const Product = {
  // Get all products
  getAllProducts: async () => {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  },

  // Get a product by ID
  getProductById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  // Add a new product
  addProduct: async (name, price) => {
    const [result] = await db.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return result.insertId;
  },

  // Update product price
  updateProductPrice: async (id, newPrice) => {
    const [result] = await db.execute('UPDATE products SET price = ? WHERE id = ?', [newPrice, id]);
    return result.affectedRows;
  },

  // Delete product
  deleteProduct: async (id) => {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Product;
