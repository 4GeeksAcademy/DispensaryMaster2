import React from "react";

const Suppliers = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers Information</h1>
        <button className="bg-black text-white px-4 py-2 rounded">Add Supplier</button>
      </div>
      <table className="table-auto w-full bg-white rounded shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Registration Date</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic Data */}
          <tr>
            <td className="px-4 py-2">Example Name</td>
            <td className="px-4 py-2">Example Company</td>
            <td className="px-4 py-2">2024-01-01</td>
            <td className="px-4 py-2">example@example.com</td>
            <td className="px-4 py-2">(123) 456-7890</td>
            <td className="px-4 py-2">123 Street, City</td>
            <td className="px-4 py-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
