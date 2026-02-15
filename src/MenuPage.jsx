import React, { useState, useEffect } from 'react';
import { API_URL } from './config';
import { getImageUrl } from './utils/urlHelper';

export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  // State for form data
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Edit mode state
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch Categories & Foods
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));

    fetch(`${API_URL}/api/foods`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch foods');
        return res.json();
      })
      .then(data => {
        console.log("Foods fetched:", data);
        setFoods(data);
      })
      .catch(err => console.error("Error fetching foods:", err));
  }, []);

  // 2. Handle File Selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 3. Add Food (Using FormData for Multer)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !category || !price) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch(`${API_URL}/api/foods`, {
        method: 'POST',
        body: formData
      });

      const newFood = await res.json();
      setFoods([...foods, newFood]);

      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3b. Edit Food
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch(`${API_URL}/api/foods/${editingId}`, {
        method: 'PUT',
        body: formData
      });

      const updatedFood = await res.json();
      setFoods(foods.map(f => f._id === editingId ? updatedFood : f));

      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form to add mode
  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setImageFile(null);
    setIsEditing(false);
    setEditingId(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = "";
  };

  // Start editing a food item
  const startEdit = (food) => {
    setName(food.name);
    setCategory(food.category);
    setPrice(food.price);
    setIsEditing(true);
    setEditingId(food._id);
    setShowModal(true);
  };

  // 4. Delete Food
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this item?")) return;
    try {
      await fetch(`${API_URL}/api/foods/${id}`, { method: 'DELETE' });
      setFoods(foods.filter(f => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Menu Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Food Item
        </button>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1400px]">
        {foods.length === 0 ? (
          <div className="col-span-full p-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Menu is empty. Add items using the button above.</p>
          </div>
        ) : (
          foods.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl transition duration-300">
              {/* Image Display */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-extrabold text-slate-800 shadow-sm">
                  ₹{item.price}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h4>
                </div>

                <div className="space-y-2 mt-5">
                  <button
                    onClick={() => startEdit(item)}
                    className="w-full py-2.5 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm font-semibold transition flex items-center justify-center gap-2"
                  >
                    ✏️ Edit Item
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-full py-2.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-600 hover:text-white text-sm font-semibold transition flex items-center justify-center gap-2"
                  >
                    🗑️ Remove Item
                  </button>
                </div>
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
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">🍔</span>
              {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
            </h3>

            {/* Form */}
            <form onSubmit={isEditing ? handleEdit : handleAdd} className="space-y-4" encType="multipart/form-data">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Classic Burger"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition appearance-none text-slate-800"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category...</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                {categories.length === 0 && <p className="text-xs text-red-500 mt-1">No categories found. Please add categories first.</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* IMAGE FILE INPUT */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Upload Image</label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? '✓ Update' : '+ Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
