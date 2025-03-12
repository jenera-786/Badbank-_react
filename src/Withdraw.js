import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Withdraw.css';
import backgroundImage from '../src/assets/cashback.gif';
import logo from '../src/assets/deposit.jpg';

const Withdraw = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
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

  const handleWithdraw = () => {
    const withdrawAmount = Number(amount);

    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return showPopup('❌ Invalid withdrawal amount!', 'error');
    }

    if (withdrawAmount > balance) {
      return showPopup('❌ Insufficient balance!', 'error');
    }

    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);

    // ✅ Now updateUserBalance is defined before being called
    updateUserBalance(newBalance, withdrawAmount);

    showPopup(`✅ Withdrawal of ₹${withdrawAmount} successful!`, 'success');
    setAmount('');
  };

  // ✅ Define updateUserBalance function
  const updateUserBalance = (newBalance, withdrawAmount) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, balance: newBalance } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...user, balance: newBalance });

    // ✅ Save transaction history
    saveTransaction('Withdraw', withdrawAmount);
  };

  // ✅ Function to save transactions in localStorage
  const saveTransaction = (type, amount) => {
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
    <div className="withdraw-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-name">Withdraw Money</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/deposit')}>💰 Deposit</button>
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

      {/* Withdraw Box */}
      <div className="center-container">
        {user && (
          <div className="withdraw-box">
            <h2>Withdraw Funds</h2>
            <h2>Welcome, {user.name}!</h2>
            <p>Available Balance: ₹{balance}</p>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="button-group">
              <button className="exclusive-btn" onClick={handleWithdraw}>💸 Withdraw</button>
              <button className="exclusive-btn" onClick={() => navigate('/dashboard')}>⬅ Back</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Withdraw;
