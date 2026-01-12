import express from 'express';
import { getProducts, getProduct, addProduct, deleteProduct } from '../controllers/productController.js';
import { getCategories } from '../controllers/adminController.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/categories/all', getCategories);

// Protected routes (would need auth middleware if needed)
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
