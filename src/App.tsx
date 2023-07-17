import React, { useState } from 'react';
import './styles/global.css';
import { BrowserRouter, useLoaderData } from "react-router-dom";

import Navbar from './components/layout/Navbar';


import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';
import { AuthContext } from './context/AuthContext';
import { User } from './hooks/useUser';

function App() {
  const [user, setUser_] = useState<User | null>(null);
  const [isLogin, setIsLogin]=useState<boolean>(false);
  // console.log(isLogin, " in app ts");
  const setUser = (user: User | null) => {
    setUser_(user);
  }
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <div className="app">
        <Navbar isLogin={isLogin} />
        <BrowserRouter>
          <AppRouter isLogin={isLogin} setIsLogin={setIsLogin} />
      </BrowserRouter>
      <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
