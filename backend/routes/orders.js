import express from 'express';
import { getOrdersByUser, createOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

// Orders routes
router.get('/user/:userId', getOrdersByUser);
router.post('/', createOrder);
router.get('/', getAllOrders);

export default router;
