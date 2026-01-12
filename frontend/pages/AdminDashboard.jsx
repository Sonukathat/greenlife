import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../services/adminApi';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingImage, setEditingImage] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, statsRes, categoriesRes] = await Promise.all([
        adminApi.getAllProducts(),
        adminApi.getStats(),
        adminApi.getCategories()
      ]);
      setProducts(productsRes.products || []);
      setStats(statsRes.stats);
      setCategories(categoriesRes.categories || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name');
      return;
    }
    try {
      const res = await adminApi.createCategory(newCategory.trim(), newCategoryImage.trim());
      setCategories(prev => [res.category, ...prev]);
      setNewCategory('');
      setNewCategoryImage('');
      alert('Category added');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add category');
    }
  };

  const startEditCategory = (c) => {
    setEditingId(c._id);
    setEditingName(c.name);
    setEditingImage(c.image || '');
  };

  const cancelEditCategory = () => {
    setEditingId(null);
    setEditingName('');
    setEditingImage('');
  };

  const saveEditCategory = async () => {
    if (!editingId || !editingName.trim()) {
      alert('Please enter a category name');
      return;
    }
    try {
      const res = await adminApi.updateCategory(editingId, editingName.trim(), editingImage.trim());
      setCategories(prev => prev.map(c => c._id === editingId ? res.category : c));
      cancelEditCategory();
      alert('Category updated');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await adminApi.deleteCategory(id);
      setCategories(prev => prev.filter(c => c._id !== id));
      alert('Category deleted');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      await adminApi.deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      alert('Product deleted successfully');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="btn-add" onClick={() => navigate('/admin/add-product')}>
          + Add New Product
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Categories Management */}
      <div className="categories-section">
        <h2>Categories</h2>
        <div className="category-form">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newCategoryImage}
            onChange={(e) => setNewCategoryImage(e.target.value)}
            className="search-input"
          />
          <button className="btn-add" onClick={handleAddCategory}>+ Add Category</button>
        </div>
        {categories.length === 0 ? (
          <p className="no-products">No categories yet</p>
        ) : (
          <ul className="category-list">
            {categories.map(c => (
              <li key={c._id}>
                {editingId === c._id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="search-input"
                      placeholder="Category name"
                    />
                    <input
                      type="text"
                      value={editingImage}
                      onChange={(e) => setEditingImage(e.target.value)}
                      placeholder="Image URL (optional)"
                      className="search-input"
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-edit" onClick={saveEditCategory} style={{ flex: 1 }}>Save</button>
                      <button className="btn-delete" onClick={cancelEditCategory} style={{ flex: 1 }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {c.image ? (
                      <img src={c.image} alt={c.name} />
                    ) : (
                      <div style={{ width: '100%', height: '80px', borderRadius: '6px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.85rem' }}>No Image</div>
                    )}
                    <span>{c.name}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-edit" onClick={() => startEditCategory(c)} style={{ flex: 1 }}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDeleteCategory(c._id)} style={{ flex: 1 }}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Total Inventory Value</h3>
            <p className="stat-value">${stats.totalValue.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{stats.lowStockProducts.length}</p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Products Table */}
      <div className="products-section">
        <h2>Products Management</h2>
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <span className={product.stock < 5 ? 'low-stock' : ''}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
