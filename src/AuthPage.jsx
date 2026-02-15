// // import React, { useState } from 'react';

// // export default function AuthPage({ onLogin, onSignup, error }) {
// //   const [isLoginView, setIsLoginView] = useState(true);
// //   const [formData, setFormData] = useState({ email: '', password: '' });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (isLoginView) {
// //       onLogin(formData.email, formData.password);
// //     } else {
// //       onSignup(formData.email, formData.password);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-red-500 p-4">
// //       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

// //         <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>

// //         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
// //           {isLoginView ? 'Chef Login' : 'Join Kitchen'}
// //         </h2>
// //         <p className="text-center text-gray-500 mb-8 text-sm">Manage your restaurant menu with ease</p>

// //         {error && (
// //           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           <div>
// //             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
// //               placeholder="chef@restaurant.com"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
// //               placeholder="••••••••"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition duration-300"
// //           >
// //             {isLoginView ? 'Enter Kitchen' : 'Create Account'}
// //           </button>
// //         </form>

// //         <div className="mt-8 text-center">
// //           <p className="text-gray-600 text-sm">
// //             {isLoginView ? "New to the team? " : "Already have an ID? "}
// //             <button
// //               onClick={() => {
// //                 setIsLoginView(!isLoginView);
// //                 setFormData({ email: '', password: '' });
// //               }}
// //               className="text-orange-600 font-bold hover:underline"
// //             >
// //               {isLoginView ? 'Register' : 'Login'}
// //             </button>
// //           </p>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';

// export default function AuthPage({ setCurrentUser }) {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Connecting to Backend Login API
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // Show error from backend (e.g., "Access Denied" or "Invalid credentials")
//         setError(data.msg || 'Login failed');
//       } else {
//         // Success - Save to LocalStorage and App State
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setCurrentUser(data.user);
//       }
//     } catch (err) {
//       setError("Server Error. Please ensure the backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

//         {/* Decorative Top Bar */}
//         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Portal</h1>
//           <p className="text-slate-500 mt-2 text-sm">Restricted Access • Staff Only</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 text-sm flex items-center gap-2">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
//               placeholder="admin@restaurant.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-300 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Verifying...
//               </span>
//             ) : (
//               'Secure Login'
//             )}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-slate-400 text-xs">
//             Protected by AdminBackDb Security System
//           </p>
//         </div>

//       </div>
//     </div>
//   );

// }



// import React, { useState } from 'react';

// export default function AuthPage({ onLogin, onSignup, error }) {
//   const [isLoginView, setIsLoginView] = useState(true);
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLoginView) {
//       onLogin(formData.email, formData.password);
//     } else {
//       onSignup(formData.email, formData.password);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-red-500 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

//         <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>

//         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
//           {isLoginView ? 'Chef Login' : 'Join Kitchen'}
//         </h2>
//         <p className="text-center text-gray-500 mb-8 text-sm">Manage your restaurant menu with ease</p>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
//               placeholder="chef@restaurant.com"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition duration-300"
//           >
//             {isLoginView ? 'Enter Kitchen' : 'Create Account'}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600 text-sm">
//             {isLoginView ? "New to the team? " : "Already have an ID? "}
//             <button
//               onClick={() => {
//                 setIsLoginView(!isLoginView);
//                 setFormData({ email: '', password: '' });
//               }}
//               className="text-orange-600 font-bold hover:underline"
//             >
//               {isLoginView ? 'Register' : 'Login'}
//             </button>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { API_URL } from './config';

export default function AuthPage({ setCurrentUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Connecting to Backend Login API
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        // Show error from backend (e.g., "Access Denied" or "Invalid credentials")
        setError(data.msg || 'Login failed');
      } else {
        // Success - Save to LocalStorage and App State
        localStorage.setItem('user', JSON.stringify(data.user));
        setCurrentUser(data.user);
      }
    } catch (err) {
      setError("Server Error. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-2 text-sm">Restricted Access • Staff Only</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
              placeholder="admin@restaurant.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-800"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-300 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'Secure Login'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs">
            Protected by AdminBackDb Security System
          </p>
        </div>

      </div>
    </div>
  );
}
