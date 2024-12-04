import React from "react";

interface TimelineBarProps {
  startPercentage: number;
  endPercentage: number;
}

const TimelineBar: React.FC<TimelineBarProps> = ({ startPercentage, endPercentage }) => {
  return (
    <div className="relative border rounded-md">
      {/* Timeline bar */}
      <div className="h-4"></div>

      {/* Filled portion (variable positions) */}
      <div
        className="absolute top-0 h-full bg-blue-500 rounded-full"
        style={{
          left: `${startPercentage}%`,
          width: `${endPercentage - startPercentage}%`,
        }}
      ></div>
    </div>
  );
};

export default TimelineBar;
