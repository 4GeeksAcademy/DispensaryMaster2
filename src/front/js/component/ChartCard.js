import React from "react";
import { Line, Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

const ChartCard = ({ type, data }) => {
  const chartTypes = {
    line: Line,
    bar: Bar,
  };

  const ChartComponent = chartTypes[type] || null;

  return ChartComponent ? (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <ChartComponent
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true },
          },
        }}
      />
    </div>
  ) : (
    <p className="text-red-500">Unsupported chart type</p>
  );
};

ChartCard.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default ChartCard;
