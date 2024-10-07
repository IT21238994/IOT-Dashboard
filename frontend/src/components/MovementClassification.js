import React from 'react';

function MovementClassification({ movementType }) {
  return (
    <div className="dashboard-item">
      <h3>Movement Classification</h3>
      <p>{movementType}</p>
    </div>
  );
}

export default MovementClassification;
