import React from "react";

const Stores = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stores</h1>
        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
          + Add Store
        </button>
      </div>

      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Store Manager</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">Store Name {index + 1}</td>
              <td className="px-4 py-2">City, State</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">(123) 456-7890</td>
              <td className="px-4 py-2">Active</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stores;
