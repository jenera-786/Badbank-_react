import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import backgroundGif from '../src/assets/signup.gif';
import logo from '../src/assets/deposit.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '', gender: '', password: '' });
  const [popup, setPopup] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && /\d/.test(value)) return;
    if (name === 'phone' && (!/^[0-9]*$/.test(value) || value.length > 10)) return;
    if (name === 'age' && (!/^[0-9]*$/.test(value) || value < 0)) return;
    setFormData({ ...formData, [name]: value });
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: '', type: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let users;
    try {
      users = JSON.parse(localStorage.getItem('users'));
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      showPopup('❌ Error: Data storage issue! Try again later.', 'error');
      return;
    }
  
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
  
    if (users.some(user => user.email === trimmedEmail)) {
      showPopup('❌ Email already registered! Use another email.', 'error');
      return;
    }
    if (users.some(user => user.phone === trimmedPhone)) {
      showPopup('❌ Phone number already registered! Use another phone number.', 'error');
      return;
    }
  
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      showPopup('❌ Please enter a valid email address!', 'error');
      return;
    }
    if (trimmedPhone.length !== 10 || !/^\d+$/.test(trimmedPhone)) {
      showPopup('❌ Phone number must be exactly 10 digits!', 'error');
      return;
    }
    if (!formData.age || Number(formData.age) < 18) {
      showPopup('❌ You must be at least 18 years old to sign up', 'error');
      return;
    }
    if (!formData.gender) {
      showPopup('❌ Please select your gender!', 'error');
      return;
    }
    if (formData.password.length < 6) {
      showPopup('❌ Password must be at least 6 characters long!', 'error');
      return;
    }
  
    users.push({ ...formData, email: trimmedEmail, phone: trimmedPhone });
    localStorage.setItem('users', JSON.stringify(users));
  
    showPopup('✅ Account created successfully!', 'success');
  
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };
  
  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundGif})` }}>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img rotating" />
          <span className="logo-name blinking">Bank Name</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/signin')}>🔑 Sign In</button>
          <button className="nav-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </nav>
      </header>

      {popup.message && <div className={`popup-message ${popup.type}`}>{popup.message}</div>}

      <form className="signup-box blinking" onSubmit={handleSubmit}>
        <h2>📝 Sign Up</h2>
        <input type="text" name="name" placeholder="👤 Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="📧 Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="📞 Phone" value={formData.phone} onChange={handleChange} required />
        <input type="number" name="age" placeholder="🎂 Age" value={formData.age} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">⚥ Select Gender</option>
          <option value="Male">♂ Male</option>
          <option value="Female">♀ Female</option>
          <option value="Other">⚧ Other</option>
        </select>
        <input type="password" name="password" placeholder="🔒 Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="submit-btn">✅ Create Account</button>
      </form>

      <footer className="footer blinking">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
