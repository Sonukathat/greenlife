import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi';

export const Home = () => {
  const { products } = useApp();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories created by admin; falls back to empty list on failure.
    adminApi.getCategories()
      .then((res) => setCategories(res.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
          <p className="text-slate-500">Pick from our curated selection of fresh organic goods</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.length === 0 ? (
            <p className="col-span-full text-center text-slate-500">No categories yet</p>
          ) : (
            categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <img
                  src={cat.image || `https://picsum.photos/seed/${encodeURIComponent(cat.name)}/400/400`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-white text-lg font-bold text-center group-hover:translate-y-[-5px] transition">{cat.name}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* New Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">New Arrivals</h2>
            <p className="text-slate-500">Freshly harvested items just added to our inventory</p>
          </div>
          <Link to="/shop" className="text-green-600 font-bold hover:underline">View All &rarr;</Link>
        </div>
        {newProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl">
            <p className="text-slate-500 mb-4">No new arrivals yet</p>
            <p className="text-sm text-slate-400">Add products and mark them as "New Arrival" in the admin panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map(product => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>

      {/* Best Sellers with Banner */}
      <section className="bg-green-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Best Sellers</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                These are the favorites that our community loves the most. Pure quality, unbeatable freshness, and 100% organic.
              </p>
              <Link to="/shop" className="inline-block px-8 py-4 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                Explore Shop
              </Link>
            </div>
            {bestSellers.length === 0 ? (
              <div className="lg:w-2/3">
                <div className="text-center py-16 bg-white rounded-2xl">
                  <p className="text-slate-500 mb-4">No best sellers yet</p>
                  <p className="text-sm text-slate-400">Add products and mark them as "Best Seller" in the admin panel</p>
                </div>
              </div>
            ) : (
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-green-900 rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
          <div className="absolute inset-0 opacity-10">
             <img src="https://picsum.photos/seed/nature/1200/400" className="w-full h-full object-cover" alt="" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Subscribe to our newsletter</h2>
            <p className="text-green-200 mb-10 text-lg">Join our community and get exclusive offers, healthy tips and more.</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/30"
              />
              <button className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-green-300/60 text-sm">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
