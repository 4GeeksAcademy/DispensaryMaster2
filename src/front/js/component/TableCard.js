import React from "react";
import PropTypes from "prop-types";

const TableCard = ({ data, columns }) => (
  <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col, index) => (
            <th
              key={index}
              className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {columns.map((col, colIndex) => (
              <td
                key={colIndex}
                className="border border-gray-300 px-4 py-2 text-gray-700"
              >
                {row[col.toLowerCase().replace(/\s/g, "_")]} {/* Handle key mapping */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableCard;
