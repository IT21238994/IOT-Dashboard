import React, { useEffect, useState } from 'react';
import './NavigationBar.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../images/logo.png';  // Correctly import the logo
import userAdmin from '../images/user-admin.png';  // User profile image

const NavigationBar = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(time);

      const date = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
      setCurrentDate(date);

      const day = now.toLocaleDateString([], { weekday: 'long' });
      setCurrentDay(day);
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const userName = "Kevin Ethan Levin";
  const userPosition = "Administrator";

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />  {/* Display the logo */}
        <h2 className="app-name">Rehabilitation Center</h2>
      </div>
      <div className="navbar-center">
        <h2 className="time">{currentTime}</h2>
        <span className="separator">|</span>
        <div className="date-day">
          <p className="date">{currentDate}</p>
          <p className="day">{currentDay}</p>
        </div>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <h4>{userName}</h4>
          <p>{userPosition}</p>
        </div>
        <img src={userAdmin} alt="User Admin" className="user-admin" />
        <ExitToAppIcon className="signout-icon" />
      </div>

      {/* Add any additional decorative elements here */}
      <div className="circle-blue-dark"></div>
    </div>
  );
};

export default NavigationBar;
