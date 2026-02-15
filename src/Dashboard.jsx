// // import React from 'react';
// // import { 
// //   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// //   BarChart, Bar, Legend
// // } from 'recharts';

// // export default function Dashboard() {

// //   const stats = [
// //     { title: 'Total Revenue', value: '₹12,450', change: '+15%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
// //     { title: 'Total Orders', value: '1,240', change: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
// //     { title: 'Pending', value: '45', change: '-2%', color: 'text-amber-600', bg: 'bg-amber-50' },
// //     { title: 'New Users', value: '89', change: '+12%', color: 'text-purple-600', bg: 'bg-purple-50' },
// //   ];

// //   const revenueData = [
// //     { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
// //     { name: 'Mar', revenue: 2000 }, { name: 'Apr', revenue: 2780 },
// //     { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 },
// //     { name: 'Jul', revenue: 3490 },
// //   ];

// //   const categoryData = [
// //     { name: 'Fast Food', sales: 400 }, { name: 'Italian', sales: 300 },
// //     { name: 'Drinks', sales: 300 }, { name: 'Desserts', sales: 200 },
// //   ];

// //   return (
// //     <div className="max-w-7xl mx-auto">
// //       <h2 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h2>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //         {stats.map((stat, index) => (
// //           <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300">
// //             <div className="flex justify-between items-start mb-4">
// //               <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide">{stat.title}</h3>
// //               <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.change}</span>
// //             </div>
// //             <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Charts Section */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

// //         {/* Revenue Chart */}
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
// //           <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Analytics</h3>
// //           <div className="h-72 w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
// //                 <defs>
// //                   <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
// //                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
// //                   </linearGradient>
// //                 </defs>
// //                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
// //                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
// //                 <Tooltip 
// //                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
// //                   itemStyle={{ color: '#4f46e5' }}
// //                 />
// //                 <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Category Chart */}
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
// //           <h3 className="text-lg font-bold text-slate-800 mb-6">Sales by Category</h3>
// //           <div className="h-72 w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={categoryData}>
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
// //                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
// //                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
// //                 <Tooltip 
// //                    cursor={{ fill: '#f1f5f9' }}
// //                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
// //                 />
// //                 <Bar dataKey="sales" name="Sales" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, Legend
// } from 'recharts';

// export default function Dashboard() {
//   const [categoryData, setCategoryData] = useState([]);

//   // Fetch Real Category Data for Chart
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
//       .then(res => res.json())
//       .then(data => {
//         // Transform API data for Recharts
//         // Maps the database fields (name, sales) to chart keys
//         const chartData = data.map(cat => ({
//           name: cat.name,
//           sales: cat.sales || 0
//         }));
//         setCategoryData(chartData);
//       })
//       .catch(err => console.error("Error fetching chart data:", err));
//   }, []);

//   const stats = [
//     { title: 'Total Revenue', value: '₹12,450', change: '+15%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
//     { title: 'Total Orders', value: '1,240', change: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
//     { title: 'Pending', value: '45', change: '-2%', color: 'text-amber-600', bg: 'bg-amber-50' },
//     { title: 'New Users', value: '89', change: '+12%', color: 'text-purple-600', bg: 'bg-purple-50' },
//   ];

//   // Dummy Revenue Data (Left Chart - Keeps Static as requested)
//   const revenueData = [
//     { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
//     { name: 'Mar', revenue: 2000 }, { name: 'Apr', revenue: 2780 },
//     { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 },
//     { name: 'Jul', revenue: 3490 },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
//         <span className="text-4xl">📊</span>
//         Dashboard Overview
//       </h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wide">{stat.title}</h3>
//               <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${stat.bg} ${stat.color} shadow-md`}>{stat.change}</span>
//             </div>
//             <p className="text-3xl md:text-4xl font-extrabold text-slate-800">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

//         {/* Revenue Chart (Static Data) */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Analytics</h3>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                   itemStyle={{ color: '#4f46e5' }}
//                 />
//                 <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Dynamic Category Sales Chart (REAL DATA) */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 hover:shadow-2xl transition-all duration-300">
//           <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex justify-between items-center">
//             <span>Sales by Category</span>
//             <span className="text-xs font-normal bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
//               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
//               Live Data
//             </span>
//           </h3>

//           <div className="h-72 w-full">
//             {categoryData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={categoryData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                   <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                   <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                   <Tooltip
//                     cursor={{ fill: '#f1f5f9' }}
//                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                   />
//                   <Legend />
//                   <Bar dataKey="sales" name="Projected Sales" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
//                 <span className="text-2xl mb-2">📊</span>
//                 <p className="text-sm font-medium">No category data available.</p>
//                 <p className="text-xs mt-1">Add categories to see the pillars.</p>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );

// }



// import React from 'react';
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, Legend
// } from 'recharts';

// export default function Dashboard() {

//   const stats = [
//     { title: 'Total Revenue', value: '₹12,450', change: '+15%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
//     { title: 'Total Orders', value: '1,240', change: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
//     { title: 'Pending', value: '45', change: '-2%', color: 'text-amber-600', bg: 'bg-amber-50' },
//     { title: 'New Users', value: '89', change: '+12%', color: 'text-purple-600', bg: 'bg-purple-50' },
//   ];

//   const revenueData = [
//     { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
//     { name: 'Mar', revenue: 2000 }, { name: 'Apr', revenue: 2780 },
//     { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 },
//     { name: 'Jul', revenue: 3490 },
//   ];

//   const categoryData = [
//     { name: 'Fast Food', sales: 400 }, { name: 'Italian', sales: 300 },
//     { name: 'Drinks', sales: 300 }, { name: 'Desserts', sales: 200 },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide">{stat.title}</h3>
//               <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.change}</span>
//             </div>
//             <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

//         {/* Revenue Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Analytics</h3>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                   itemStyle={{ color: '#4f46e5' }}
//                 />
//                 <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Category Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800 mb-6">Sales by Category</h3>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={categoryData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip 
//                    cursor={{ fill: '#f1f5f9' }}
//                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                 />
//                 <Bar dataKey="sales" name="Sales" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { API_URL } from './config';

export default function Dashboard() {
  const [categoryData, setCategoryData] = useState([]);

  // Fetch Real Category Data for Chart
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        // Transform API data for Recharts
        // Maps the database fields (name, sales) to chart keys
        const chartData = data.map(cat => ({
          name: cat.name,
          sales: cat.sales || 0
        }));
        setCategoryData(chartData);
      })
      .catch(err => console.error("Error fetching chart data:", err));
  }, []);

  const stats = [
    { title: 'Total Revenue', value: '₹12,450', change: '+15%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Orders', value: '1,240', change: '+5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Pending', value: '45', change: '-2%', color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'New Users', value: '89', change: '+12%', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  // Dummy Revenue Data (Left Chart - Keeps Static as requested)
  const revenueData = [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 }, { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <span className="text-4xl">📊</span>
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wide">{stat.title}</h3>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${stat.bg} ${stat.color} shadow-md`}>{stat.change}</span>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Revenue Chart (Static Data) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Analytics</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#4f46e5' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Category Sales Chart (REAL DATA) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex justify-between items-center">
            <span>Sales by Category</span>
            <span className="text-xs font-normal bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Live Data
            </span>
          </h3>

          <div className="h-72 w-full">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="sales" name="Projected Sales" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                <span className="text-2xl mb-2">📊</span>
                <p className="text-sm font-medium">No category data available.</p>
                <p className="text-xs mt-1">Add categories to see the pillars.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
