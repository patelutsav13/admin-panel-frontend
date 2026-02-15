// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// // // Import your components
// // import AuthPage from './AuthPage';
// // import Sidebar from './Sidebar';
// // import Dashboard from './Dashboard';
// // import MenuPage from './MenuPage';
// // import UserPage from './UserPage';

// // export default function App() {

// //   const [currentUser, setCurrentUser] = useState(() => {
// //     const savedUser = localStorage.getItem('user');
// //     return savedUser ? JSON.parse(savedUser) : null;
// //   });

// //   const [users, setUsers] = useState([
// //     { email: 'admin@restaurant.com', password: 'admin' }
// //   ]);

// //   const [error, setError] = useState('');

// //   const handleLogin = (email, password) => {
// //     const user = users.find(u => u.email === email && u.password === password);
// //     if (user) {

// //       localStorage.setItem('user', JSON.stringify(user));
// //       setCurrentUser(user);
// //       setError('');
// //     } else {
// //       setError('Invalid email or password.');
// //     }
// //   };


// //   const handleSignup = (email, password) => {
// //     if (!email || !password) {
// //       setError('All fields are required.');
// //       return;
// //     }
// //     const exists = users.some(u => u.email === email);
// //     if (exists) {
// //       setError('User already exists. Please login.');
// //     } else {
// //       const newUser = { email, password };
// //       setUsers([...users, newUser]);


// //       localStorage.setItem('user', JSON.stringify(newUser));
// //       setCurrentUser(newUser); 
// //       setError('');
// //     }
// //   };


// //   const handleLogout = () => {

// //     localStorage.removeItem('user');
// //     setCurrentUser(null);
// //   };

// //   const AdminLayout = () => {
// //     return (
// //       <div className="flex bg-gray-50 min-h-screen">
// //         <Sidebar onLogout={handleLogout} />
// //         <div className="flex-1 ml-64 p-8">
// //           <Outlet /> 
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route 
// //           path="/" 
// //           element={
// //             !currentUser ? (
// //               <AuthPage 
// //                 onLogin={handleLogin} 
// //                 onSignup={handleSignup} 
// //                 error={error} 
// //               />
// //             ) : (
// //               <Navigate to="/admin/dashboard" replace />
// //             )
// //           } 
// //         />

// //         {currentUser ? (
// //           <Route path="/admin" element={<AdminLayout />}>
// //             <Route path="dashboard" element={<Dashboard />} />
// //             <Route path="menu" element={<MenuPage />} />
// //             <Route path="users" element={<UserPage />} />

// //             <Route path="orders" element={
// //               <div className="p-8 text-center text-gray-500 text-xl font-bold">
// //                 Orders Management Coming Soon 🛍️
// //               </div>
// //             } />
// //             <Route path="settings" element={
// //               <div className="p-8 text-center text-gray-500 text-xl font-bold">
// //                 Settings Page Coming Soon ⚙️
// //               </div>
// //             } />

// //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// //           </Route>
// //         ) : (
// //           <Route path="/admin/*" element={<Navigate to="/" replace />} />
// //         )}

// //         <Route path="*" element={<Navigate to="/" replace />} />

// //       </Routes>
// //     </Router>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { ThemeProvider } from './ThemeContext';

// // Import Components
// import AuthPage from './AuthPage';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import MenuPage from './MenuPage';
// import UserPage from './UserPage';
// import CategoryPage from './CategoryPage';
// import HotelMenu from './HotelMenu';
// import OrdersPage from './OrdersPage';
// import SettingsPage from './SettingsPage';

// export default function App() {
//   // Load user from local storage on initial load
//   const [currentUser, setCurrentUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   // Layout for Admin Pages (Sidebar + Content)
//   const AdminLayout = () => {
//     return (
//       <div className="flex bg-slate-100 dark:bg-gray-900 min-h-screen font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300">
//         <Sidebar onLogout={handleLogout} />
//         {/* Main Content Area - Shifted right to accommodate fixed sidebar */}
//         <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
//           <Outlet />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <ThemeProvider>
//       <Router>
//         <Routes>
//           {/* Public Route: Login */}
//           <Route
//             path="/"
//             element={
//               !currentUser ? (
//                 <AuthPage setCurrentUser={setCurrentUser} />
//               ) : (
//                 <Navigate to="/admin/dashboard" replace />
//               )
//             }
//           />

//           {/* Protected Admin Routes */}
//           {currentUser ? (
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="category" element={<CategoryPage />} />
//               <Route path="menu" element={<MenuPage />} />
//               <Route path="users" element={<UserPage />} />
//               <Route path="hotel-menu" element={<HotelMenu />} />
//               <Route path="orders" element={<OrdersPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//               <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             </Route>
//           ) : (
//             // Redirect to login if accessing /admin without auth
//             <Route path="/admin/*" element={<Navigate to="/" replace />} />
//           )}

//           {/* Catch all - Redirect to Login */}
//           <Route path="*" element={<Navigate to="/" replace />} />

//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// // Import your components
// import AuthPage from './AuthPage';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import MenuPage from './MenuPage';
// import UserPage from './UserPage';

// export default function App() {

//   const [currentUser, setCurrentUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [users, setUsers] = useState([
//     { email: 'admin@restaurant.com', password: 'admin' }
//   ]);

//   const [error, setError] = useState('');

//   const handleLogin = (email, password) => {
//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {

//       localStorage.setItem('user', JSON.stringify(user));
//       setCurrentUser(user);
//       setError('');
//     } else {
//       setError('Invalid email or password.');
//     }
//   };


//   const handleSignup = (email, password) => {
//     if (!email || !password) {
//       setError('All fields are required.');
//       return;
//     }
//     const exists = users.some(u => u.email === email);
//     if (exists) {
//       setError('User already exists. Please login.');
//     } else {
//       const newUser = { email, password };
//       setUsers([...users, newUser]);


//       localStorage.setItem('user', JSON.stringify(newUser));
//       setCurrentUser(newUser); 
//       setError('');
//     }
//   };


//   const handleLogout = () => {

//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   const AdminLayout = () => {
//     return (
//       <div className="flex bg-gray-50 min-h-screen">
//         <Sidebar onLogout={handleLogout} />
//         <div className="flex-1 ml-64 p-8">
//           <Outlet /> 
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             !currentUser ? (
//               <AuthPage 
//                 onLogin={handleLogin} 
//                 onSignup={handleSignup} 
//                 error={error} 
//               />
//             ) : (
//               <Navigate to="/admin/dashboard" replace />
//             )
//           } 
//         />

//         {currentUser ? (
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="menu" element={<MenuPage />} />
//             <Route path="users" element={<UserPage />} />

//             <Route path="orders" element={
//               <div className="p-8 text-center text-gray-500 text-xl font-bold">
//                 Orders Management Coming Soon 🛍️
//               </div>
//             } />
//             <Route path="settings" element={
//               <div className="p-8 text-center text-gray-500 text-xl font-bold">
//                 Settings Page Coming Soon ⚙️
//               </div>
//             } />

//             <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           </Route>
//         ) : (
//           <Route path="/admin/*" element={<Navigate to="/" replace />} />
//         )}

//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//     </Router>
//   );
// }

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

// Import Components
import AuthPage from './AuthPage';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import MenuPage from './MenuPage';
import UserPage from './UserPage';
import CategoryPage from './CategoryPage';
import HotelMenu from './HotelMenu';
import OrdersPage from './OrdersPage';
import SettingsPage from './SettingsPage';

export default function App() {
  // Load user from local storage on initial load
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Layout for Admin Pages (Sidebar + Content)
  const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
      <div className="flex bg-slate-100 dark:bg-gray-900 min-h-screen font-sans text-slate-900 dark:text-gray-100 transition-colors duration-300 relative">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-indigo-600/90 text-white rounded-lg shadow-lg md:hidden hover:bg-indigo-700 transition-colors backdrop-blur-sm"
        >
          {isSidebarOpen ? '✖' : '☰'}
        </button>

        {/* Sidebar with Mobile State */}
        <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content Area */}
        <div className={`flex-1 p-8 overflow-y-auto h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-64 blur-sm md:blur-none' : 'ml-0 md:ml-64'}`}>
          <Outlet />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Route: Login */}
          <Route
            path="/"
            element={
              !currentUser ? (
                <AuthPage setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            }
          />

          {/* Protected Admin Routes */}
          {currentUser ? (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="hotel-menu" element={<HotelMenu />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          ) : (
            // Redirect to login if accessing /admin without auth
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
          )}

          {/* Catch all - Redirect to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}
