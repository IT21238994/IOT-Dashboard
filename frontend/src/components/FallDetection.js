import React from 'react';

function FallDetection({ fallDetected }) {
  return (
    <div className="dashboard-item">
      <h3>Fall Detection</h3>
      <p>{fallDetected ? "Fall Detected!" : "No Falls"}</p>
    </div>
  );
}

export default FallDetection;
