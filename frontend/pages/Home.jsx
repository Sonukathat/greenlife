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
    <div className="pb-24">
      <Hero />

      {/* Featured Categories */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">EXPLORE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Pick from our curated selection of fresh organic goods</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 py-12">No categories yet</p>
            ) : (
              categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={cat.image || `https://picsum.photos/seed/${encodeURIComponent(cat.name)}/400/400`}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className="text-white text-lg font-bold text-center drop-shadow-lg group-hover:translate-y-[-5px] transition-transform duration-300">{cat.name}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">FRESH</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">New Arrivals</h2>
              <p className="text-lg text-slate-600">Freshly harvested items just added to our inventory</p>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
              View All 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          {newProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 mb-4">No new arrivals yet</p>
              <p className="text-sm text-slate-400">Add products and mark them as "New Arrival" in the admin panel</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newProducts.map(product => <ProductCard key={product._id} product={product} />)}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers with Banner */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">POPULAR</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Best Sellers</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                These are the favorites that our community loves the most. Pure quality, unbeatable freshness, and 100% organic.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Explore Shop
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            {bestSellers.length === 0 ? (
              <div className="lg:w-2/3 w-full">
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 mb-4">No best sellers yet</p>
                  <p className="text-sm text-slate-400">Add products and mark them as "Best Seller" in the admin panel</p>
                </div>
              </div>
            ) : (
              <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
                {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl overflow-hidden p-12 md:p-20 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-white text-sm font-bold">NEWSLETTER</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get Fresh Updates</h2>
              <p className="text-white/90 mb-10 text-lg">Join our community and get exclusive offers, healthy tips and seasonal recipes delivered to your inbox.</p>
              
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 text-slate-800 placeholder:text-slate-400 shadow-lg"
                />
                <button className="px-10 py-5 bg-white hover:bg-slate-50 text-green-700 font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </form>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-white/70 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                <span>We respect your privacy. Unsubscribe anytime.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
