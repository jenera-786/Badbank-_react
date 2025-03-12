import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './SignUp';
import Signin from './SignIn';
import Dashboard from './DashBoard';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transactions from './Transactions';
import Profile from './Profile';
import Admin from './Admin';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/SignIn" element={<Signin />} />
                <Route path= "/Dashboard" element={<Dashboard />} />
                <Route path= "/Deposit" element={<Deposit />} />
                <Route path= "/Withdraw" element={<Withdraw />} />
                <Route path= "/Profile" element={<Profile />} />
                <Route path= "/Admin" element={<Admin />} />
                <Route path= "/Transactions" element={<Transactions />} />
            </Routes>
        </Router>
    );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Signin from './pages/Signin';
// import Home from './pages/Home';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/signin" element={<Signin />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
