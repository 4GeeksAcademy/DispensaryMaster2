// import React, { useState, useEffect } from "react";
// import MetricCard from "../components/MetricCard";
// import Chart from "../components/Chart";
// import Table from "../components/Table";

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState([]);
//   const [topCategories, setTopCategories] = useState([]);
//   const [salesPerformance, setSalesPerformance] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch metrics from the backend
//     fetch(process.env.BACKEND_URL + "/api/dashboard/metrics")
//       .then((response) => response.json())
//       .then((data) => {
//         setMetrics(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching metrics:", error);
//         setLoading(false);
//       });

//     // Fetch top categories
//     fetch(process.env.BACKEND_URL + "/api/dashboard/top-categories")
//       .then((response) => response.json())
//       .then((data) => setTopCategories(data))
//       .catch((error) => console.error("Error fetching top categories:", error));

//     // Fetch sales performance data
//     fetch(process.env.BACKEND_URL + "/api/dashboard/sales-performance")
//       .then((response) => response.json())
//       .then((data) => setSalesPerformance(data))
//       .catch((error) => console.error("Error fetching sales performance:", error));
//   }, []);

//   return (
//     <div className="flex">
     
//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome back, Matthew</h1>
//             <p className="text-gray-600">Here are today's stats from your online store!</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <input
//               type="text"
//               placeholder="Search"
//               className="border p-2 rounded-lg"
//             />
//             <button className="relative">
//               <i className="fas fa-bell text-gray-500"></i>
//               <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">4</span>
//             </button>
//             <div className="flex items-center gap-2">
//               <img
//                 src="https://via.placeholder.com/40"
//                 alt="profile"
//                 className="rounded-full w-10 h-10"
//               />
//               <span>Matthew Parker</span>
//             </div>
//           </div>
//         </div>

//         {/* Metrics Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
//           {metrics.map((metric, index) => (
//             <MetricCard
//               key={index}
//               title={metric.label}
//               value={metric.value}
//               trend={metric.trend}
//               bgColor={index % 2 === 0 ? "bg-black text-white" : "bg-white"}
//             />
//           ))}
//         </div>

//         {/* Sales Performance Chart */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">Sales Performance</h2>
//           {loading ? (
//             <p>Loading chart...</p>
//           ) : (
//             <Chart data={salesPerformance} type="line" />
//           )}
//         </div>

//         {/* Top Categories Table */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
//           <Table data={topCategories} columns={["Category", "Sales", "Revenue"]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
