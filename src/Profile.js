import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import backgroundImage from '../src/assets/profile.gif'; // Background image
import avatar from '../src/assets/deposit.jpg'; // Default profile image

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === loggedInUserEmail);

    if (!foundUser) {
      navigate('/signin');
      return;
    }

    setUser(foundUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div className="profile-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <header className="header">
        <h2>👤 Profile</h2>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </header>

      {/* Profile Details */}
      <div className="profile-box">
        <img src={avatar} alt="User Avatar" className="profile-avatar" />
        <h2>Welcome, {user?.name || 'User'}!</h2>
        <p>🎂 Age: {user?.age || 'N/A'}</p>
        <p>⚤ Gender: {user?.gender || 'N/A'}</p>
        <p>📞 Phone: {user?.phone || 'N/A'}</p>
        <p>⚖ Balance: ₹{user?.balance}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="button-group">
        <button className="nav-btn" onClick={() => navigate('/dashboard')}>🏠 Back to Dashboard</button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
