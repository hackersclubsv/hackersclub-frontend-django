import React, { useState } from 'react';
import './styles/global.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from './components/layout/Navbar';


import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';



function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <div className="app">
      <Navbar isLogin={isLogin} />
      <BrowserRouter>
        <AppRouter isLogin={isLogin} setIsLogin={setIsLogin} />
    </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
