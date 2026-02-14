// import React, { useState, useEffect } from 'react';

// export default function HotelMenu() {
//   const [menuData, setMenuData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, foodsRes] = await Promise.all([
//           fetch('http://localhost:5000/api/categories'),
//           fetch('http://localhost:5000/api/foods')
//         ]);

//         const categories = await categoriesRes.json();
//         const foods = await foodsRes.json();

//         const organizedMenu = {};
//         categories.forEach(cat => {
//           organizedMenu[cat.name] = [];
//         });

//         foods.forEach(food => {
//           if (organizedMenu[food.category]) {
//             organizedMenu[food.category].push(food);
//           }
//         });

//         setMenuData(organizedMenu);
//       } catch (err) {
//         console.error("Error fetching menu data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex justify-center items-center">
//         <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-red-100 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Outfit:wght@400;500;700&family=Oswald:wght@500&display=swap');
//           .font-cursive { font-family: 'Dancing Script', cursive; }
//           .font-item { font-family: 'Outfit', sans-serif; }
//           .font-header { font-family: 'Oswald', sans-serif; }
//         `}
//       </style>

//       <div className="w-full max-w-[760px] bg-white shadow-2xl overflow-hidden flex flex-col rounded-xl">

//         {/* HEADER */}
//         <div className="bg-orange-500 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
//           {/* Logo on LEFT */}
//           <div className="flex-shrink-0">
//             <img
//               src="https://png.pngtree.com/png-vector/20250104/ourmid/pngtree-a-chef-holding-hamburger-and-fries-png-image_15048996.png"
//               alt="Cappsara Logo"
//               className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-full border-4 border-white shadow-lg"
//             />
//           </div>

//           {/* Center Text */}
//           <div className="text-center flex-1">
//             <h1 className="text-6xl md:text-7xl font-cursive text-white leading-none drop-shadow-lg">
//               Cappsara
//             </h1>
//             <h2 className="text-3xl md:text-4xl font-header text-black tracking-wider uppercase mt-2">
//               Foods Court
//             </h2>
//             <p className="text-lg md:text-xl text-black font-medium mt-2">
//               Premium Taste & Quality
//             </p>
//           </div>
//         </div>

//         {/* MENU BODY */}
//         <div className="p-10 md:p-12 bg-white">
//           {Object.keys(menuData).length === 0 ? (
//             <div className="text-center py-16 text-gray-600 text-xl font-medium">
//               Menu is currently empty. Add items from admin panel.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16"> {/* 2 columns on md+, more vertical space */}
//               {Object.entries(menuData).map(([category, items]) => (
//                 <div key={category}>
//                   {/* Category Title with black underline */}
//                   <div className="text-center mb-8">
//                     <h3 className="text-4xl md:text-5xl font-cursive text-orange-600 inline-block pb-2 border-b-4 border-black">
//                       {category}
//                     </h3>
//                   </div>

//                   {/* Items List */}
//                   <ul className="space-y-5">
//                     {items.length > 0 ? (
//                       items.map(item => (
//                         <li key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0">
//                           <span className="font-item text-gray-900 font-semibold text-lg md:text-xl">
//                             {item.name}
//                           </span>
//                           <span className="font-header text-orange-600 font-bold text-lg md:text-xl">
//                             ₹ {item.price}
//                           </span>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-center text-gray-500 italic text-lg">
//                         No items available
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* FOOTER - Black BG */}
//         <div className="bg-black p-8 md:p-10 text-center border-t-4 border-orange-500">
//           <div className="flex flex-col items-center gap-6">
//             {/* Social Icons */}
//             <div className="flex justify-center gap-8 mb-4">
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
//                   alt="Facebook"
//                   className="w-10 h-10 hover:opacity-80 transition"
//                 />
//               </a>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
//                   alt="Instagram"
//                   className="w-10 h-10 hover:opacity-80 transition"
//                 />
//               </a>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
//                   alt="Twitter"
//                   className="w-10 h-10 hover:opacity-80 transition"
//                 />
//               </a>
//             </div>

//             {/* Address */}
//             <p className="text-xl md:text-2xl text-orange-400 font-medium max-w-[400px] leading-relaxed">
//               301, Royal Estate Plaza, Satellite,<br />
//               SG Highway, Ahmedabad
//             </p>


//             {/* Website - Blue Link */}
//             <a
//               href="https://www.cappsarafoods.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-400 hover:text-blue-300 text-lg md:text-xl font-medium underline cursor-pointer transition"
//             >
//               www.cappsarafoods.com
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

export default function HotelMenu() {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, foodsRes] = await Promise.all([
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/foods')
        ]);

        const categories = await categoriesRes.json();
        const foods = await foodsRes.json();

        const organizedMenu = {};
        categories.forEach(cat => {
          organizedMenu[cat.name] = [];
        });

        foods.forEach(food => {
          if (organizedMenu[food.category]) {
            organizedMenu[food.category].push(food);
          }
        });

        setMenuData(organizedMenu);
      } catch (err) {
        console.error("Error fetching menu data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-100 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Outfit:wght@400;500;700&family=Oswald:wght@500&display=swap');
          .font-cursive { font-family: 'Dancing Script', cursive; }
          .font-item { font-family: 'Outfit', sans-serif; }
          .font-header { font-family: 'Oswald', sans-serif; }
        `}
      </style>

      <div className="w-full max-w-[760px] bg-white shadow-2xl overflow-hidden flex flex-col rounded-xl">

        {/* HEADER */}
        <div className="bg-orange-500 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="flex-shrink-0">
            <img
              src="https://png.pngtree.com/png-vector/20250104/ourmid/pngtree-a-chef-holding-hamburger-and-fries-png-image_15048996.png"
              alt="Cappsara Logo"
              className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <div className="text-center flex-1">
            <h1 className="text-6xl md:text-7xl font-cursive text-white leading-none drop-shadow-lg">
              Cappsara
            </h1>
            <h2 className="text-3xl md:text-4xl font-header text-black tracking-wider uppercase mt-2">
              Foods Court
            </h2>
            <p className="text-lg md:text-xl text-black font-medium mt-2">
              Premium Taste & Quality
            </p>
          </div>
        </div>

        {/* MENU BODY */}
        <div className="p-10 md:p-12 bg-white">
          {Object.keys(menuData).length === 0 ? (
            <div className="text-center py-16 text-gray-600 text-xl font-medium">
              Menu is currently empty. Add items from admin panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-20">
              {Object.entries(menuData).map(([category, items]) => (
                <div key={category} className="relative rounded-2xl overflow-hidden p-6">

                  {/* CATEGORY BACKGROUND IMAGE */}
                  <img
                    src={
                        category.toLowerCase().includes('burger')
                        ? 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('pizza')
                        ? 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('drink')
                        ? 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('desert')
                        ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('southInd')
                      ? 'https://images.unsplash.com/photo-1604908554027-3b6b3b4d7a1c?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('gujarti') || category.toLowerCase().includes('gujarati')
                        ? 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
                        : category.toLowerCase().includes('punjabi')
                        ? 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80'

                        : 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'
                    }
                    alt={category}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-2xl"
                  />

                  {/* CONTENT */}
                  <div className="relative z-10">

                    <div className="text-center mb-8">
                      <h3 className="text-4xl md:text-5xl font-cursive text-orange-600 inline-block pb-2 border-b-4 border-black">
                        {category}
                      </h3>
                    </div>

                    <ul className="space-y-5">
                      {items.length > 0 ? (
                        items.map(item => (
                          <li
                            key={item._id}
                            className="flex justify-between items-center border-b border-gray-300 pb-4 last:border-0"
                          >
                            <span className="font-item text-gray-900 font-semibold text-lg md:text-xl">
                              {item.name}
                            </span>
                            <span className="font-header text-orange-600 font-bold text-lg md:text-xl">
                              ₹ {item.price}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-center text-gray-600 italic text-lg">
                          No items available
                        </li>
                      )}
                    </ul>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-black p-8 md:p-10 text-center border-t-4 border-orange-500">
          <div className="flex flex-col items-center gap-6">

            <div className="flex justify-center gap-8 mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-10 h-10" />
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" className="w-10 h-10" />
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="w-10 h-10" />
            </div>

            <p className="text-xl md:text-2xl text-orange-600 font-medium max-w-[400px] leading-relaxed">
             📌301, Royal Estate Plaza, Satellite,<br />
              SG Highway, Ahmedabad
            </p>

            <div className="space-y-6 text-center">
              <h1 className="font-cursive text-4xl text-orange-600 tracking-wide">
              Monday – Saturday
              </h1>
              <p className="font-sans  font-bold  text-3xl text-white">
                Time :
              <span className="font-sans  font-bold  text-2xl text-white ml-2">
                9:30 AM – 11:00 PM
              </span>
            </p>

          <h1 className="font-cursive text-4xl text-orange-600 tracking-wide mt-8">
            Sunday
          </h1>
          <p className="font-sans  font-bold text-3xl text-white">
            Time :
          <span className="font-sans  font-bold  text-2xl text-white ml-2">
            10:00 AM – 11:00 PM
          </span>
        </p>
      </div>

<div className="mt-16 text-center">
  <h1 className="font-header text-3xl md:text-4xl text-cyan-400 tracking-wider">
    Orders Available for
  </h1>
  <h1 className="font-cursive text-4xl md:text-5xl text-orange-500 mt-2">
    Marriages & Other Functions
  </h1>
</div>
x

            <a
              href="https://www.cappsarafoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-lg md:text-xl underline cursor-pointer"
            >
              www.cappsarafoods.com
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}

