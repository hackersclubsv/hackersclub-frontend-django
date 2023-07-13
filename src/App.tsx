import React from 'react';
import './styles/global.css';

import AppRouter from './routes/AppRouter';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
