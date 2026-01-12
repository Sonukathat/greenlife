import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, orders } = useApp();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Please login to view your profile</h2>
        <Link to="/login" className="text-green-600 mt-4 inline-block">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-80">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold">
              {user.name[0]}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 mb-6">{user.email}</p>
            {user.isAdmin && (
               <div className="px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full inline-block mb-6 uppercase tracking-wider">
                 Administrator
               </div>
            )}
            <div className="space-y-2 text-left">
              <button className="w-full px-4 py-3 bg-green-50 text-green-700 font-bold rounded-xl transition">Orders</button>
              <button className="w-full px-4 py-3 hover:bg-slate-50 text-slate-600 font-medium rounded-xl transition">Settings</button>
              {user.isAdmin && (
                 <Link to="/admin" className="block w-full px-4 py-3 hover:bg-slate-50 text-slate-600 font-medium rounded-xl transition">Admin Dashboard</Link>
              )}
            </div>
          </div>
        </aside>

        {/* Orders Content */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Order History</h2>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8 flex-wrap">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
                        <p className="font-bold text-slate-700">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                        <p className="font-bold text-slate-700">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                        <p className="font-bold text-green-700">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="px-4 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                      {order.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex -space-x-3 overflow-hidden">
                      {order.items.map((item, i) => (
                        <img 
                          key={i} 
                          className="inline-block h-12 w-12 rounded-full ring-4 ring-white object-cover" 
                          src={item.image} 
                          alt={item.name} 
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 ring-4 ring-white">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500">You haven't placed any orders yet.</p>
              <Link to="/shop" className="text-green-600 font-bold mt-4 inline-block hover:underline">Start Shopping</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
