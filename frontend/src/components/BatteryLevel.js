import React from 'react';

function BatteryLevel({ batteryLevel }) {
  return (
    <div className="dashboard-item">
      <h3>Battery Level</h3>
      <p>{batteryLevel}%</p>
    </div>
  );
}

export default BatteryLevel;
