import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import backgroundImage from '../src/assets/Transaction.gif'; // Background image

const ADMIN_PASSWORD = "admin123"; // Fixed admin password

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setUsers(storedUsers);
    setTransactions(storedTransactions.reverse()); // Show latest first
  }, []);

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Also remove user's transactions
    const updatedTransactions = transactions.filter((tx) => tx.email !== email);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === "") {
      setModalMessage("❌ Please fill in the password!");
      setIsModalOpen(true); // Show modal if the password field is empty
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal after 3 seconds
      }, 3000);
    } else if (enteredPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true); // Allow access if the password is correct
    } else {
      setModalMessage("❌ Incorrect Admin Password!");
      setIsModalOpen(true); // Show modal if the password is incorrect
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal after 3 seconds
        setEnteredPassword(''); // Clear the entered password for the next try
      }, 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-password-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="password-box">
          <h2>🔑 Enter Admin Password</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>🔓 Access Admin</button>
        </div>
        
        {/* Modal Pop-up */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <p>{modalMessage}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <header className="header">
        <h2>🔧 Admin Dashboard</h2>
        <button className="back-btn" onClick={() => navigate('/')}>⬅ Back</button>
      </header>

      {/* User List */}
      <div className="admin-box">
        <h2>👥 Registered Users</h2>
        {users.length > 0 ? (
          <div className="user-list">
            {users.map((user, index) => (
              <div key={index} className="user-card">
                <h3>🆔 {user.name}</h3>
                <h3>📧 {user.email}</h3>
                <h3>🎂 {user.age} </h3>
                <h3>⚤ {user.gender} </h3> 
                <h3>📞 {user.phone}</h3>
                <h3>💰 Balance: ₹{user.balance}</h3>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.email)}>❌ Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">No users found.</p>
        )}
      </div>

      {/* Transaction List */}
      <div className="admin-box">
        <h2>📜 Transaction History</h2>
        {transactions.length > 0 ? (
          <div className="transaction-list">
            {transactions.map((tx, index) => (
              <div key={index} className={`transaction-card ${tx.type.toLowerCase()}`}>
                <p>📧 {tx.email}</p>
                <p>🛠 {tx.type} | 💸 ₹{tx.amount}</p>
                <p>📅 {tx.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-transactions">No transactions found.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Online Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Admin;
