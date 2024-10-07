import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.scss";
import NavigationBar from "./components/NavigationBar"; // Import the NavigationBar component
import Footer from "./components/Footer"; // Footer import

// Importing Material-UI Icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import WarningIcon from "@material-ui/icons/Warning";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import BatteryAlertIcon from "@material-ui/icons/BatteryAlert"; // Importing icon for low battery
import userPatient from "./images/user-patient.png"; // Import the patient image

const socket = io.connect("http://localhost:5000");

function App() {
  const [stepCount, setStepCount] = useState(0);
  const [fallDetected, setFallDetected] = useState(false);
  const [movementType, setMovementType] = useState("walking");
  const [batteryLevel, setBatteryLevel] = useState(75);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      setStepCount(data.stepCount);
      setFallDetected(data.isFallDetected);
      setMovementType(data.movementType);
      setBatteryLevel(data.batteryLevel);
    });
  }, []);

  // Function to determine battery icon based on battery level
  const renderBatteryIcon = () => {
    if (batteryLevel > 50) {
      return <BatteryFullIcon style={{ fontSize: 40, color: "white" }} />;
    } else if (batteryLevel > 20) {
      return <BatteryAlertIcon style={{ fontSize: 40, color: "orange" }} />; // Warning icon for medium battery
    } else {
      return <BatteryAlertIcon style={{ fontSize: 40, color: "red" }} />; // Critical battery icon
    }
  };

  return (
    <div className="App">
      <NavigationBar />
      <div className="spacer" />
      <div className="container">
        <div className="profile-dashboard">
          <div className="patient-profile">
            <img src={userPatient} alt="Patient" className="patient-image" />
            <div className="patient-info">
              <h2>Patient Name: Maxwell Tennyson</h2>
              <br />
              <p>Patient ID: 123456</p>
              <p>Room No: 101</p>
              <p>Mobile No: 0712345678</p>
            </div>
          </div>

          <div className="dashboard">
            <div className="dashboard-row">
              <div className="dashboard-item">
                <DirectionsWalkIcon style={{ fontSize: 40, color: "white" }} />
                <h3>Step Count</h3>
                <p>{stepCount}</p>
              </div>
              <div className="dashboard-item">
                <WarningIcon
                  style={{
                    fontSize: 40,
                    color: fallDetected ? "red" : "white", // Change color to red if a fall is detected
                  }}
                />
                <h3>Fall Detection</h3>
                <p>{fallDetected ? "Fall Detected!" : "No Falls"}</p>
              </div>
              <div className="dashboard-item">
                <FitnessCenterIcon style={{ fontSize: 40, color: "white" }} />
                <h3>Movement Classification</h3>
                <p>{movementType.charAt(0).toUpperCase() + movementType.slice(1)}</p>
              </div>
              <div className="dashboard-item">
                {renderBatteryIcon()} {/* Dynamic battery icon */}
                <h3>Battery Level</h3>
                <p>{batteryLevel}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer" /> {/* Spacer to add white space */}
      <Footer /> {/* Footer */}
    </div>
  );
}

export default App;
