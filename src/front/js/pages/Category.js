import React from "react";

const Category = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Name</h1>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Filter
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
            Sort
          </button>
        </div>
      </div>

      {/* Subcategories */}
      <div className="flex gap-4 overflow-auto pb-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 w-40 h-20 rounded-lg shadow-md flex items-center justify-center"
          >
            Subcategory {index + 1}
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <div className="bg-gray-200 w-full h-40 rounded-md mb-4"></div>
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-gray-600">$95</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
