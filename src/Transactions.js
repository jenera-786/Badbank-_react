import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './TransactionHistory.css';
import backgroundImage from '../src/assets/Transaction.gif'; // ✅ Fixed import path
import logo from '../src/assets/deposit.jpg'; // ✅ Fixed import path

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
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

    // ✅ Fetch transaction history for the logged-in user
    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const userTransactions = allTransactions.filter((tx) => tx.email === loggedInUserEmail);
    
    setTransactions([...userTransactions].reverse()); // ✅ Move `.reverse()` inside setter
  }, [navigate]);

  // ✅ Compute balance from transactions
  const balance = transactions.reduce((total, tx) => {
    if (tx.type === 'Deposit') return total + Number(tx.amount);
    if (tx.type === 'Withdraw') return total - Number(tx.amount);
    return total;
  }, 0);

  return (
    <div className="transactions-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-name">Transaction History</span>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
          <button className="nav-btn" onClick={() => navigate('/deposit')}>💰 Deposit</button>
          <button className="nav-btn" onClick={() => navigate('/withdraw')}>💸 Withdraw</button>
        </nav>
      </header>

      {/* Transactions List */}
      <div className="history-box">
        <h2>📜 Your Transactions</h2>
        <h2>Welcome, {user?.name || 'User'}!</h2> 
        <h3>⚖ Balance: ₹{balance}</h3> {/* ✅ Fix: Ensure balance is calculated correctly */}
        
        {transactions.length > 0 ? (
          <div className="transaction-list">
            {transactions.map((tx, index) => {
              if (!tx.amount) return null; // ✅ Fix: Ignore invalid transactions
              return (
                <div key={index} className={`transaction-card ${tx.type?.toLowerCase() || ''}`}>
                  <span className="tx-type">{tx.type === 'Deposit' ? '➕ Deposit' : '➖ Withdraw'}</span>
                  <span className="tx-amount">₹{tx.amount}</span>
                  <span className="tx-date">{tx.date}</span>
                </div>
              );
            })}
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

export default Transactions;
