import React, { useState, useEffect } from 'react';
import { API_URL } from './config';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState('');
  const [salesTarget, setSalesTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch Categories from Backend
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // 2. Add Category Handler
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: catName,
          sales: Number(salesTarget)
        })
      });

      const data = await res.json();

      // Check for errors (like duplicate category)
      if (!res.ok) {
        alert(data.msg || "Error adding category");
        setLoading(false);
        return;
      }

      // Success
      setCategories([...categories, data]);
      setCatName('');
      setSalesTarget('');
      setShowModal(false); // Close modal after success
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Category Handler
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? \n\n⚠️ WARNING: This will also delete ALL Food Items listed under "${name}".`)) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, { method: 'DELETE' });
      setCategories(categories.filter(c => c._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Category Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add New Category
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1400px]">
        {categories.length === 0 ? (
          <div className="col-span-full p-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No categories found. Add one using the button above.</p>
          </div>
        ) : (
          categories.map(cat => (
            <div
              key={cat._id}
              className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md border border-slate-200 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-bold text-white relative z-10">{cat.name}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sales Target</span>
                  <span className="text-3xl font-extrabold text-emerald-600">
                    {cat.sales || 0}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((cat.sales / 1000) * 100, 100)}%` }}
                  ></div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(cat._id, cat.name)}
                  className="w-full py-2.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-500 hover:text-white text-sm font-semibold transition flex items-center justify-center gap-2"
                  title="Delete Category"
                >
                  🗑️ Delete Category
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Background */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg text-2xl">✨</span>
              Add New Category
            </h3>

            {/* Form */}
            <form onSubmit={handleAdd} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category Name</label>
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Italian"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Projected Sales</label>
                <input
                  type="number"
                  value={salesTarget}
                  onChange={(e) => setSalesTarget(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">This number will determine the height of the pillar in the Dashboard.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Adding...' : '+ Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
