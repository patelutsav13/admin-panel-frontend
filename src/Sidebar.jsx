

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Categories', path: '/admin/category', icon: '🏷️' },
    { name: 'Menu Items', path: '/admin/menu', icon: '🍽️' },
    { name: 'Hotel Menu', path: '/admin/hotel-menu', icon: '📜' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Orders', path: '/admin/orders', icon: '🛍️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-slate-900 dark:bg-gray-950 text-white min-h-screen flex flex-col fixed left-0 top-0 h-full shadow-2xl z-20 font-sans transition-colors duration-300">

      {/* Brand Header */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800 dark:border-gray-800 bg-slate-950 dark:bg-black">
        <h1 className="text-xl font-bold tracking-wider">
          <span className="text-indigo-500 text-2xl">CAPPSRA</span>
          <span className="text-white ml-3">Foods</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-900/50 transform scale-105'
                    : 'text-slate-400 hover:bg-slate-800 dark:hover:bg-gray-800 hover:text-white hover:scale-105'
                    }`}
                >
                  <span className={`text-xl transition-transform duration-200 ${!isActive && 'group-hover:scale-125 group-hover:rotate-12'}`}>{item.icon}</span>
                  <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800 dark:border-gray-800 bg-slate-950 dark:bg-black">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white py-2.5 px-4 rounded-lg transition-all duration-300 border border-red-500/20 hover:border-red-600 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">🚪</span>
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}