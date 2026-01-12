import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

const PlaceholderPage = ({ title, copy }) => (
  <div className="max-w-4xl mx-auto px-4 py-24 text-center">
    <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
    <p className="text-slate-500 text-lg">{copy}</p>
  </div>
);

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useApp();
  
  // If not logged in, redirect to login with redirect param for admin page
  if (!user) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }
  
  // If logged in but not admin, show access denied
  if (!isAdmin) {
    return <PlaceholderPage title="Access denied" copy="You need admin privileges to view this page." />;
  }
  
  return children;
};

const NotFound = () => (
  <PlaceholderPage title="Page not found" copy="The page you are looking for does not exist." />
);

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main className="pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add-product"
                element={
                  <AdminRoute>
                    <AddProduct />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edit-product/:id"
                element={
                  <AdminRoute>
                    <EditProduct />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
