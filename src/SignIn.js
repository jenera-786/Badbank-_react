import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import backgroundGif from '../src/assets/signup.gif';
import logo from '../src/assets/deposit.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [allUsers, setAllUsers] = useState([]); // ✅ Store all users

  // ✅ Fetch all existing users when the component loads
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setAllUsers(users);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.name.toLowerCase() === formData.name.toLowerCase() &&
        u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (!user) {
      showPopup("❌ Name or Email not registered!", "error");
      return;
    }

    if (user.password !== formData.password) {
      showPopup("❌ Incorrect password!", "error");
      return;
    }

    // ✅ Store the logged-in user's email
    localStorage.setItem('loggedInUser', user.email);

    showPopup("✅ Login successful!", "success");

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: '', type: '' }), 2000);
  };

  return (
    <div className="signin-container" style={{ backgroundImage: `url(${backgroundGif})` }}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img rotating" />
          <span className="logo-name blinking">Bank Name</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/signup')}>📝 Sign Up</button>
          <button className="nav-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </nav>
      </header>
  
      {/* Pop-up Message */}
      {popup.message && <div className={`popup-message ${popup.type}`}>{popup.message}</div>}
  
      {/* Sign In Form */}
      <form className="signin-box blinking" onSubmit={handleSubmit}>
        <h2>🔑 Sign In</h2>
        <input type="text" name="name" placeholder="👤 Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="📧 Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="🔒 Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="submit-btn">🚀 Login</button>
      </form>
  
      {/* ✅ Show All Registered Users */}
  
      {/* Footer */}
      <footer className="footer blinking">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>  // ✅ Properly closed this div
  );
};
export default SignIn;