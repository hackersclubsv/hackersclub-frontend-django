import './styles/global.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function App() {  
  return (
    <div className='app'>
      <Header />
      <Container>
        <ToastContainer />
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
