const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

//define endpoints
router.post('/add', productController.addProduct);  
router.get('/get', productController.getAllProducts);
router.get('/get/:category', productController.getProductByCategory);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
