import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-green-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </span>
        )}
      </Link>
      <div className="p-5">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-widest">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-bold text-slate-800 hover:text-green-700 transition line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-xs text-slate-400">({product.reviews})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2.5 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-lg transition-colors border border-green-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
