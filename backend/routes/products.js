import express from 'express';
import { getProducts, getProduct, addProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Products routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
