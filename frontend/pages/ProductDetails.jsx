import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useApp();
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-green-600 mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex mb-8 text-sm font-medium text-slate-400">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-green-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Gallery */}
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4">
               <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-400 font-medium">{product.reviews} customer reviews</span>
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</p>

          <p className="text-slate-600 text-lg leading-relaxed">
            {product.description} Our products are carefully sourced from organic farms that prioritize soil health and ecological balance. No GMOs, no synthetic additives.
          </p>

          <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl px-4 py-2">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center text-xl text-slate-500 hover:text-green-600 transition"
              >
                -
              </button>
              <span className="w-12 text-center font-bold text-lg">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 flex items-center justify-center text-xl text-slate-500 hover:text-green-600 transition"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => {
                for(let i=0; i<qty; i++) addToCart(product);
              }}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg shadow-green-900/10 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-sm font-bold text-slate-700">100% Organic</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span className="text-sm font-bold text-slate-700">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
