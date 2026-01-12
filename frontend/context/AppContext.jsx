import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Initial load
  useEffect(() => {
    // Load products from backend
    api.getProducts().then(setProducts).catch(console.error);
    
    // Load user from localStorage
    const savedUser = localStorage.getItem('gl_active_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      // Load orders from backend
      api.getOrders(user.id).then(setOrders).catch(console.error);
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('gl_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('gl_cart', JSON.stringify(cart));
  }, [cart]);

  const login = async (email, password) => {
    const response = await api.login(email, password);
    if (response) {
      const u = response.user;
      const token = response.token;
      setUser(u);
      localStorage.setItem('gl_active_user', JSON.stringify({ ...u, token }));
      const userOrders = await api.getOrders(u.id);
      setOrders(userOrders);
      return u; // Return user object so component can check isAdmin
    }
    return null;
  };

  const register = async (name, email, password) => {
    const u = await api.register(name, email, password);
    setUser(u);
    localStorage.setItem('gl_active_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gl_active_user');
    setOrders([]);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const checkout = async () => {
    if (!user) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = await api.createOrder(user.id, cart, total);
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AppContext.Provider value={{
      user, products, cart, orders, 
      login, register, logout, 
      addToCart, removeFromCart, updateQuantity, 
      clearCart, checkout, isAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
