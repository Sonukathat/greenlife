import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, stock, isNew, isBestSeller } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, error: 'Name and price are required' });
    }

    const product = {
      name,
      price: parseFloat(price),
      description: description || '',
      category: category || 'General',
      image: image || '',
      stock: parseInt(stock) || 0,
      isNew: Boolean(isNew),
      isBestSeller: Boolean(isBestSeller)
    };

    const newProduct = await Product.create(product);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, image, stock, isNew, isBestSeller } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Update product fields
    if (name) product.name = name;
    if (price) product.price = parseFloat(price);
    if (description !== undefined) product.description = description;
    if (category) product.category = category;
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = parseInt(stock);
    if (isNew !== undefined) product.isNew = Boolean(isNew);
    if (isBestSeller !== undefined) product.isBestSeller = Boolean(isBestSeller);

    const updatedProduct = await product.save();

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProductStats = async (req, res) => {
  try {
    const products = await Product.find();
    const stats = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + (p.price * (p.stock || 1)), 0),
      lowStockProducts: products.filter(p => (p.stock || 0) < 5)
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Category already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      image: image?.trim() || ''
    });
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    const exists = await Category.findOne({ name: name.trim() });
    if (exists && String(exists._id) !== String(id)) {
      return res.status(409).json({ success: false, error: 'Category with this name already exists' });
    }
    category.name = name.trim();
    if (image !== undefined) {
      category.image = image?.trim() || '';
    }
    const updated = await category.save();
    res.json({ success: true, category: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
