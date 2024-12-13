// import React, { useState } from 'react';
// import { Menu, X, Package, Users, ShoppingCart, ClipboardList, Settings, LogOut, Bell } from 'lucide-react';


// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activePage, setActivePage] = useState('Products');

//   const navigationItems = [
//     { name: 'Products', icon: Package },
//     { name: 'Customers', icon: Users },
//     { name: 'Orders', icon: ShoppingCart },
//     { name: 'Compliance', icon: ClipboardList },
//     { name: 'Settings', icon: Settings },
//   ];

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 transition-all duration-300`}>
//         <div className="h-full flex flex-col">
//           {/* Logo area */}
//           <div className="h-16 flex items-center justify-between px-4">
//             {isSidebarOpen && (
//               <span className="text-white text-lg font-semibold">Dispensary MS</span>
//             )}
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-300 hover:text-white"
//             >
//               {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 space-y-1 px-2 py-4">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => setActivePage(item.name)}
//                   className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
//                     ${activePage === item.name 
//                       ? 'bg-gray-900 text-white' 
//                       : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
//                 >
//                   <Icon className="mr-3 h-6 w-6" />
//                   {isSidebarOpen && item.name}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* User section */}
//           <div className="border-t border-gray-700 p-4">
//             <button className="w-full flex items-center text-gray-300 hover:text-white">
//               <LogOut className="mr-3 h-6 w-6" />
//               {isSidebarOpen && 'Logout'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top header */}
//         <header className="bg-white shadow">
//           <div className="h-16 flex items-center justify-between px-4">
//             <h1 className="text-2xl font-semibold text-gray-800">{activePage}</h1>
//             <div className="flex items-center space-x-4">
//               <button className="relative text-gray-600 hover:text-gray-900">
//                 <Bell size={24} />
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
//               </button>
//               <div className="flex items-center space-x-2">
//                 <div className="h-8 w-8 rounded-full bg-gray-300"></div>
//                 {isSidebarOpen && (
//                   <span className="text-sm font-medium text-gray-700">Admin User</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="flex-1 overflow-auto bg-gray-100 p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white rounded-lg shadow p-6">
//               {activePage === 'Products' && (
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-lg font-medium">Product List</h2>
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                       Add Product
//                     </button>
//                   </div>
//                   <div className="border rounded-md p-4">
//                     <p className="text-gray-500">Product content will be displayed here</p>
//                   </div>
//                 </div>
//               )}
//               {/* Add other page contents here */}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;