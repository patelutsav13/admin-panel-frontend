// import React, { useState } from 'react';

// export default function UserPage() {

//   const [users, setUsers] = useState([
//     { id: 1, name: 'Patel Utsav', email: 'utsav@example.com', role: 'Customer', joinDate: '2025-11-15', status: 'Active' },
//     { id: 2, name: 'Krish Modi', email: 'krish@example.com', role: 'Customer', joinDate: '2025-12-01', status: 'Active' },
//     { id: 3, name: 'John Chef', email: 'john@kitchen.com', role: 'Admin', joinDate: '2025-10-10', status: 'Active' },
//     { id: 4, name: 'Sarah Connor', email: 'sarah@test.com', role: 'Customer', joinDate: '2026-01-05', status: 'Inactive' },
//   ]);

//   const handleDelete = (id) => {
//     if(window.confirm("Are you sure you want to remove this user?")) {
//         setUsers(users.filter(user => user.id !== id));
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">User Management</h2>
//           <span className="bg-white px-4 py-1.5 rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100">
//             {users.length} Users
//           </span>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-orange-50 text-orange-800 text-sm uppercase tracking-wider">
//                   <th className="p-5 font-bold">User Name</th>
//                   <th className="p-5 font-bold">Email</th>
//                   <th className="p-5 font-bold">Role</th>
//                   <th className="p-5 font-bold">Join Date</th>
//                   <th className="p-5 font-bold">Status</th>
//                   <th className="p-5 font-bold text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
//                     <td className="p-5">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
//                           {user.name.charAt(0)}
//                         </div>
//                         <span className="font-semibold text-gray-800">{user.name}</span>
//                       </div>
//                     </td>
//                     <td className="p-5 text-gray-600">{user.email}</td>
//                     <td className="p-5">
//                       <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
//                         user.role === 'Admin' 
//                           ? 'bg-purple-100 text-purple-700 border border-purple-200' 
//                           : 'bg-blue-100 text-blue-700 border border-blue-200'
//                       }`}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="p-5 text-gray-500 text-sm font-mono">{user.joinDate}</td>
//                     <td className="p-5">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         user.status === 'Active' 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-gray-100 text-gray-500'
//                       }`}>
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="p-5 text-right">
//                       <button 
//                         onClick={() => handleDelete(user.id)}
//                         className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
//                         title="Delete User"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {users.length === 0 && (
//             <div className="p-10 text-center text-gray-400 bg-gray-50">
//               No users found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState([]);

  // Fetch Users
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, { method: 'DELETE' });
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">User Management</h2>
        <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-slate-500 shadow-sm border border-slate-200">
          {users.length} Registered Users
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 font-bold">User Name</th>
                <th className="p-5 font-bold">Email Address</th>
                <th className="p-5 font-bold">Role</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition duration-200">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="font-semibold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 font-mono text-sm">{user.email}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold border ${user.role === 'Admin'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1 ${user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                      }`}>
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    {user.role === 'Customer' && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition duration-200"
                        title="Delete User"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No users found in the database.
          </div>
        )}
      </div>
    </div>
  );
}