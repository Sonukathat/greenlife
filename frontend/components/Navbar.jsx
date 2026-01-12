import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { cart, user, logout, isAdmin } = useApp();
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?q=${search}`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">G</span>
            </div>
            <span className="text-2xl font-bold text-green-800 tracking-tight hidden sm:block">GreenLife</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-green-600 font-medium transition">Home</Link>
            <Link to="/shop" className="text-slate-600 hover:text-green-600 font-medium transition">Shop</Link>
            <Link to="/about" className="text-slate-600 hover:text-green-600 font-medium transition">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-green-600 font-medium transition">Contact</Link>
            {isAdmin && (
              <Link to="/admin" className="text-slate-600 hover:text-green-600 font-medium transition bg-green-100 px-3 py-1 rounded-lg">Admin</Link>
            )}
          </div>

          {/* Right Icons & Search */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search organic..."
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-48 transition-all focus:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </form>

            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-green-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-green-200">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=15803d&color=fff`} alt="Profile" />
                </Link>
                <button onClick={logout} className="text-xs font-semibold text-slate-400 hover:text-red-500 uppercase tracking-wider">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-slate-600 hover:text-green-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </Link>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 p-4 space-y-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-slate-600">Home</Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-slate-600 bg-green-100 px-3 py-1 rounded-lg">Admin</Link>
          )}
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-slate-600">Shop</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-slate-600">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-slate-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};
