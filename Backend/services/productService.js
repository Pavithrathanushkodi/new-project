const Product = require('../models/product');

const productService = {
  // Fetch all products
  getAllProducts: async () => {
    try {
      return await Product.getAllProducts();
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },

  // Fetch a product by ID
  getProductById: async (id) => {
    try {
      return await Product.getProductById(id);
    } catch (error) {
      throw new Error('Error fetching product');
    }
  },

  // Add a new product
  addProduct: async (name, price) => {
    try {
      return await Product.addProduct(name, price);
    } catch (error) {
      throw new Error('Error adding product');
    }
  },

  // Update product price
  updateProductPrice: async (id, newPrice) => {
    try {
      return await Product.updateProductPrice(id, newPrice);
    } catch (error) {
      throw new Error('Error updating product price');
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      return await Product.deleteProduct(id);
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }
};

module.exports = productService;
