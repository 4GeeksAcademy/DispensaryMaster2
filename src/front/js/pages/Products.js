import React from "react";

const Products = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded">Add Product</button>
          <button className="bg-black text-white px-4 py-2 rounded">Add Category</button>
        </div>
      </div>
      <table className="table-auto w-full bg-white rounded shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic Data */}
          <tr>
            <td className="px-4 py-2">Blue Dream</td>
            <td className="px-4 py-2">Available</td>
            <td className="px-4 py-2">Flower</td>
            <td className="px-4 py-2">$12.99</td>
            <td className="px-4 py-2">2024-01-01</td>
            <td className="px-4 py-2">FLR001</td>
            <td className="px-4 py-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;
