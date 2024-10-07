import React from 'react';

function StepCounter({ stepCount }) {
  return (
    <div className="dashboard-item">
      <h3>Step Count</h3>
      <p>{stepCount}</p>
    </div>
  );
}

export default StepCounter;
