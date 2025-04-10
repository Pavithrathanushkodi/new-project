const productService = require('../services/productService');

const productController = {
  // Handle fetching all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  },

  // Handle fetching a product by ID
  getProductById: async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  },

  // Handle adding a new product
  addProduct: async (req, res) => {
    const { name, price } = req.body;
    try {
      const productId = await productService.addProduct(name, price);
      res.status(201).json({ id: productId, name, price });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product' });
    }
  },

  // Handle updating product price
  updateProductPrice: async (req, res) => {
    const { id, newPrice } = req.body;
    try {
      const updatedRows = await productService.updateProductPrice(id, newPrice);
      if (updatedRows > 0) {
        res.json({ message: 'Product price updated successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating price' });
    }
  },

  // Handle deleting a product
  deleteProduct: async (req, res) => {
    try {
      const deletedRows = await productService.deleteProduct(req.params.id);
      if (deletedRows > 0) {
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  }
};

module.exports = productController;
