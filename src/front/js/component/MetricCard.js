import React from "react";
import PropTypes from "prop-types";

const MetricCard = ({ title, value, icon, trend, bgColor = "bg-white", textColor = "text-gray-900" }) => (
  <div className={`${bgColor} shadow-lg rounded-lg p-4 flex items-center space-x-4`}>
    {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
    <div>
      <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      {trend && (
        <p className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? `+${trend}%` : `${trend}%`} this week
        </p>
      )}
    </div>
  </div>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element,
  trend: PropTypes.number,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default MetricCard;
