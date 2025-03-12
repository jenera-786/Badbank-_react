import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';
import backgroundImage from '../src/assets/dashboard.gif'; // Background image
import logo from '../src/assets/deposit.jpg'; // Logo image

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === loggedInUserEmail);

    if (!foundUser) {
      alert('No user found. Redirecting to Sign In...');
      navigate('/signin');
      return;
    }

    setUser(foundUser);
    setBalance(foundUser.balance || 0);
  }, [navigate]);

  return (
    <div className="dashboard-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img rotating" />
          <span className="logo-name blinking">Dashboard</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/profile')}>👤 Profile</button>
          <button className="nav-btn" onClick={() => navigate('/transactions')}>📜 Transactions</button>
          <button className="nav-btn" onClick={() => navigate('/')}>🚪 Logout</button>
        </nav>
      </header>

      <div className="center-container">
        {user && (
          <div className="details-box blinking">
            <h2>Welcome, {user.name}!</h2>
            <h3>⚖ Balance: ₹{balance}</h3>
            <div className="button-group">
              <button className="exclusive-btn" onClick={() => navigate('/deposit')}>💰 Deposit</button>
              <button className="exclusive-btn" onClick={() => navigate('/withdraw')}>💸 Withdraw</button>
            </div>
          </div>
        )}
      </div>

      <footer className="footer blinking">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
