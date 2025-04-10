const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Define product-related routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/update-price', productController.updateProductPrice);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
