const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;

// Sample data to emit
let stepCount = 0;
let isFallDetected = false;
let movementType = "walking";  // walking, jogging, running
let batteryLevel = 75;  // example battery level

setInterval(() => {
    stepCount += 1;
    isFallDetected = Math.random() > 0.98;  // Simulate fall detection
    const movementTypes = ["walking", "jogging", "running"];
    movementType = movementTypes[Math.floor(Math.random() * movementTypes.length)];
    batteryLevel = Math.max(0, batteryLevel - 1);

    io.emit("sensorData", {
        stepCount,
        isFallDetected,
        movementType,
        batteryLevel
    });
}, 1000);  // Emit data every 1 second

app.get("/", (req, res) => {
    res.send("Server is running...");
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
