import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [userId, setUserId] = useState(false);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={userId ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route
            path="login"
            element={userId ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="signup"
            element={userId ? <Navigate replace to="/" /> : <SignUp />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
