import React from "react";
import MetricCard from "./MetricCard";
import Chart from "./ChartCard";
import Table from "./TableCard";

const DashboardComponent = ({ metrics, salesPerformance, topCategories, loading }) => {
  return (
    <div>
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.label}
            value={metric.value}
            icon={React.createElement(require("react-icons/fa")[metric.icon])} // Dynamically render icons
          />
        ))}
      </div>

      {/* Sales Performance Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Sales Performance</h2>
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <Chart data={salesPerformance} type="line" />
        )}
      </div>

      {/* Top Categories Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
        <Table data={topCategories} columns={["Category", "Sales", "Revenue"]} />
      </div>
    </div>
  );
};

export default DashboardComponent;
