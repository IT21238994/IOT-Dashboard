import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.scss";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

// Importing Material-UI Icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import WarningIcon from "@material-ui/icons/Warning";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import BatteryAlertIcon from "@material-ui/icons/BatteryAlert";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike"; // Jogging icon
import userPatient from "./images/user-patient.png"; // Import the patient image

const socket = io.connect("http://localhost:5000");

function App() {
  const [stepCount, setStepCount] = useState(0);
  const [fallDetected, setFallDetected] = useState(false);
  const [movementType, setMovementType] = useState("walking");
  const [batteryLevel, setBatteryLevel] = useState(75);

  const warningSoundRef = useRef(null);  // Reference to the audio element

  useEffect(() => {
    socket.on("sensorData", (data) => {
      setStepCount(data.stepCount);
      setFallDetected(data.isFallDetected);
      setMovementType(data.movementType);
      setBatteryLevel(data.batteryLevel);
    });
  }, []);

  // Play warning sound when fall is detected
  useEffect(() => {
    if (fallDetected) {
      if (warningSoundRef.current) {
        warningSoundRef.current.play(); // Play the warning sound
      }
    }
  }, [fallDetected]);

  // Function to determine battery icon based on battery level
  const renderBatteryIcon = () => {
    if (batteryLevel > 50) {
      return <BatteryFullIcon style={{ fontSize: 40, color: "white" }} />;
    } else if (batteryLevel > 20) {
      return <BatteryAlertIcon style={{ fontSize: 40, color: "orange" }} />;
    } else {
      return <BatteryAlertIcon style={{ fontSize: 40, color: "red" }} />;
    }
  };

  // Function to determine movement icon based on activity
  const renderMovementIcon = () => {
    if (movementType === "walking") {
      return <DirectionsWalkIcon style={{ fontSize: 40, color: "white" }} />;
    } else if (movementType === "jogging") {
      return <DirectionsBikeIcon style={{ fontSize: 40, color: "white" }} />; // Jogging as biking icon
    } else if (movementType === "running") {
      return <DirectionsRunIcon style={{ fontSize: 40, color: "white" }} />;
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
              {/* Step Count */}
              <div className="dashboard-item">
                <DirectionsWalkIcon style={{ fontSize: 40, color: "white" }} />
                <h3>Step Count</h3>
                <p>{stepCount}</p>
              </div>

              {/* Fall Detection - Blinking, Red Background, and Warning Sound */}
              <div className={`dashboard-item ${fallDetected ? "blink-red" : ""}`}>
                <WarningIcon
                  style={{
                    fontSize: 40,
                    color: fallDetected ? "red" : "white",
                  }}
                />
                <h3>Fall Detection</h3>
                <p>{fallDetected ? "Fall Detected!" : "No Falls"}</p>
              </div>

              {/* Movement Classification - Dynamic Icon */}
              <div className="dashboard-item">
                {renderMovementIcon()}
                <h3>Movement Classification</h3>
                <p>{movementType.charAt(0).toUpperCase() + movementType.slice(1)}</p>
              </div>

              {/* Battery Level */}
              <div className="dashboard-item">
                {renderBatteryIcon()}
                <h3>Battery Level</h3>
                <p>{batteryLevel}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Sound Element */}
      <audio ref={warningSoundRef} src="/warning-sound.mp3" preload="auto" />

      <div className="spacer" /> {/* Spacer to add white space */}
      <Footer /> {/* Footer */}
    </div>
  );
}

export default App;
