import Order from '../models/orderModel.js';

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    if (!userId || !items || !total) {
      return res.status(400).json({ error: 'User ID, items, and total are required' });
    }
    const order = await Order.create({ userId, items, total });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
