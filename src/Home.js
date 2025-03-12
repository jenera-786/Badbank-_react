import React from 'react'; 
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../src/assets/create.gif"; // Corrected path
import logoImage from '../src/assets/deposit.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Bank Logo" className="logo-img" />
          <div className="logo-name">Neon Bank</div>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/signin')}>🔑 Sign In</button>
          <button className="nav-btn" onClick={() => navigate('/signup')}>📝 Sign Up</button>
          <button className="nav-btn" onClick={() => navigate('/admin')}>🔐 Admin Login</button>
        </nav>
      </header>
      
      {/* Bank Details Section */}
      <section className="center-container">
        <div className="details-box blinking">
          <h2>Welcome to Our Neon Bank</h2>
          <p>Secure, Fast, and Reliable Banking Services. Enjoy 24/7 online banking with the latest security features.</p>
          <p>Our services include instant fund transfers, loan applications, and investment opportunities.</p>
          <div className="buttons">
            <button className="exclusive-btn" onClick={() => navigate('/signin')}>🔑 Sign In</button>
            <button className="exclusive-btn" onClick={() => navigate('/signup')}>📝 Sign Up</button>
          </div>
          <div>
            <p><strong>Bank Name:</strong> XYZ Bank</p>
            <p><strong>Branch Address:</strong> 123 Main Street, Sulur, Coimbatore District, Tamil Nadu, India</p>
            <p><strong>Branch Code:</strong> 005678</p>
            <p><strong>Contact Number:</strong> +91 9876543210</p>
            <p><strong>Email:</strong> contact@xyzbank.com</p>
            <p><strong>Working Hours:</strong> Monday to Friday: 9 AM - 5 PM; Saturday: 9 AM - 1 PM</p>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="footer blinking">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
