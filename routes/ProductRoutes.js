const express = require('express');
const { validateParamID,validateNewItems, checkValidationResult } = require('../middleware/ProductValidator');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/product_Controller');

const router = express.Router();

router.post('/api/products', validateNewItems, checkValidationResult, createProduct);
router.get('/api/products', getAllProducts);
router.get('/api/products/:id',validateParamID, checkValidationResult, getProductById);
router.put('/api/products/:id', validateParamID,validateNewItems, checkValidationResult, updateProduct);
router.delete('/api/products/:id',validateParamID, checkValidationResult, deleteProduct);

module.exports = router;
