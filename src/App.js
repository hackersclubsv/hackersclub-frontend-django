import { useState } from 'react';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ResetPassword from './pages/ResetPassword.js';
import ForgotPassword from './pages/ForgotPassword.js';

const App = () => {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/verify/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
