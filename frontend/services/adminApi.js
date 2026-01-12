import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getAuthToken = () => {
  const savedUser = localStorage.getItem('gl_active_user');
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    return userData.token;
  }
  return null;
};

const adminApi = {
  // Get all products for admin
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/products`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/products`, productData, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/products/${id}`, productData, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/products/${id}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get admin stats
  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
  ,
  // Categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/categories`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (name, image) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/categories`, { name, image }, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/categories/${id}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
  ,
  updateCategory: async (id, name, image) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/categories/${id}`, { name, image }, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
};

export default adminApi;
