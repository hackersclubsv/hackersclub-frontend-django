import { useState } from 'react';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

const App = () => {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
    </div>
  );
};

export default App;
