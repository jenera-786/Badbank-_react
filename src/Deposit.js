import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Deposit.css';
import backgroundImage from '../src/assets/deposit.gif';
import logo from '../src/assets/deposit.jpg';

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === loggedInUserEmail);

    if (!foundUser) {
      showPopup('❌ No user found! Redirecting to Sign In...', 'error');
      setTimeout(() => navigate('/signin'), 2000);
      return;
    }

    setUser(foundUser);
    setBalance(foundUser.balance || 0);
  }, [navigate]);

  const handleDeposit = () => {
    const depositAmount = Number(amount);

    if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
      return showPopup('❌ Invalid amount! Please enter a valid number.', 'error');
    }

    if (depositAmount > 50000) {
      return showPopup('❌ Maximum deposit limit is ₹50,000!', 'error');
    }

    const newBalance = balance + depositAmount;
    setBalance(newBalance);

    // ✅ Now updateUserBalance is defined before being called
    updateUserBalance(newBalance, depositAmount);

    showPopup(`✅ Deposit Successful! New Balance: ₹${newBalance}`, 'success');
    setAmount('');
  };

  // ✅ Define updateUserBalance function
  const updateUserBalance = (newBalance, depositAmount) => {
    if (!user) return; // ✅ Fix to prevent undefined user

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, balance: newBalance } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...user, balance: newBalance });

    // ✅ Save transaction history
    saveTransaction('Deposit', depositAmount);
  };

  // ✅ Function to save transactions in localStorage
  const saveTransaction = (type, amount) => {
    if (!user) return; // ✅ Fix to prevent undefined user

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const newTransaction = {
      email: user.email,
      type,
      amount,
      date: new Date().toLocaleString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const showPopup = (message, type) => {
    setPopupMessage({ message, type });
    setTimeout(() => setPopupMessage(null), 3000);
  };

  return (
    <div className="deposit-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img rotating" />
          <span className="logo-name blinking">Bank Deposit</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/withdraw')}>💸 Withdraw</button>
          <button className="nav-btn" onClick={() => navigate('/profile')}>👤 Profile</button>
          <button className="nav-btn" onClick={() => navigate('/transactions')}>📜 Transactions</button>
        </nav>
      </header>

      {/* Pop-up Message */}
      {popupMessage && (
        <div className={`popup-message ${popupMessage.type}`}>
          {popupMessage.message}
        </div>
      )}

      {/* Deposit Form */}
      <div className="center-container">
        <div className="deposit-box">
          <h2>💰 Deposit Money</h2>
          <h2>Welcome, {user?.name || 'User'}!</h2> {/* ✅ Fix to prevent undefined user */}
          <p>⚖ Current Balance: ₹{balance}</p>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="button-group">
            <button className="exclusive-btn" onClick={handleDeposit}>✅ Deposit</button>
            <button className="exclusive-btn" onClick={() => navigate(-1)}>⬅ Back</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer blinking">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Deposit;
