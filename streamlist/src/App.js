import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css';

function App() {
  // Track login state from LocalStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('eztech_auth') === 'true';
  });

  // Listen for login/logout state updates across components
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('eztech_auth') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom check interval or event listener if sign-in happens within the same window
    const interval = setInterval(() => {
      const currentAuth = localStorage.getItem('eztech_auth') === 'true';
      if (currentAuth !== isLoggedIn) {
        setIsLoggedIn(currentAuth);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar is only rendered when the user is successfully logged in */}
        {isLoggedIn && <Navbar />}
        
        <main className="content">
          <Routes>
            {/* Root path displays StreamList (which shows Google OAuth login if logged out) */}
            <Route path="/" element={<StreamList />} />

            {/* Protected Routes: If not logged in, trying to access these redirects to '/' */}
            <Route 
              path="/movies" 
              element={isLoggedIn ? <Movies /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/cart" 
              element={isLoggedIn ? <Cart /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/about" 
              element={isLoggedIn ? <About /> : <Navigate to="/" replace />} 
            />

            {/* Catch-all redirect back to root login barrier */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;