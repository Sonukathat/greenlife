import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import adminApi from '../services/adminApi';

export const Shop = () => {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  
  const query = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    adminApi.getCategories()
      .then((res) => setCategories(res.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = p.price <= priceRange;
        return matchesQuery && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default
      });
  }, [products, query, selectedCategory, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === 'All' ? 'bg-green-600 text-white' : 'hover:bg-green-50 text-slate-600'}`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button 
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === cat.name ? 'bg-green-600 text-white' : 'hover:bg-green-50 text-slate-600'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Price Range</h3>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>₹1</span>
              <span>Up to ₹{priceRange}</span>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
            <h4 className="font-bold text-green-800 mb-2">Need help?</h4>
            <p className="text-xs text-green-700/70 mb-4">Our organic experts are here to help you choose the best products.</p>
            <button className="text-sm font-bold text-green-600 hover:underline">Contact Support</button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <p className="text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
              {query && <span> for "<span className="italic">{query}</span>"</span>}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No products found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setPriceRange(50); setSearchParams({}); }}
                className="mt-6 text-green-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
