import React, { useState } from 'react';
import './styles/global.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from './components/layout/Navbar';

import Home from './pages/Home';
import CampusInfo from './pages/CampusInfo';
import CareerDev from './pages/CareerDev';
import TechDojo from './pages/TechDojo';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Footer from './components/layout/Footer';



function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <div className="app">
      <Navbar isLogin={isLogin} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/campusinfo' element={<CampusInfo />}/>
          <Route path='careerdev' element={<CareerDev />}/>
          <Route path='TechDojo' element={<TechDojo />}/>
          ( isLogin? (
            <Route path='/userprofile' element={<UserProfile/>}/>
            <Route path='/logout' element={<Home />}/>
          ) : (
            <Route path='/login' element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
          ))
          <Route path='/' element={<Home />}/>
        </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
