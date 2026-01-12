import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { api } from '../services/api';
import '../styles/ProductForm.css';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'General',
    image: '',
    stock: '',
    isNew: false,
    isBestSeller: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const product = await api.getProduct(id);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description || '',
        category: product.category || 'General',
        image: product.image || '',
        stock: product.stock || '',
        isNew: product.isNew || false,
        isBestSeller: product.isBestSeller || false
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch product');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      setError('Name and price are required');
      return;
    }

    try {
      setSubmitLoading(true);
      setError(null);
      await adminApi.updateProduct(id, formData);
      alert('Product updated successfully!');
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
      console.error('Error:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  return (
    <div className="product-form-container">
      <h1>Edit Product</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Dairy">Dairy</option>
              <option value="Spices">Spices</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {formData.image && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={formData.image} alt="Product preview" />
          </div>
        )}

        <div className="form-row">
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="isNew"
              name="isNew"
              checked={formData.isNew}
              onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
            />
            <label htmlFor="isNew" style={{ margin: 0 }}>Mark as New Arrival</label>
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="isBestSeller"
              name="isBestSeller"
              checked={formData.isBestSeller}
              onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
            />
            <label htmlFor="isBestSeller" style={{ margin: 0 }}>Mark as Best Seller</label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitLoading}>
            {submitLoading ? 'Updating...' : 'Update Product'}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/admin')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
