import "./styles/global.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
// Execute refresh token logic here
import { refreshToken } from "./services/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshToken();
      },
      1000 * 60 * 55,
    ); // Refresh token every __ minutes, backend token expires in 1 hour
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="app">
      <Header />
      <Container>
        <Outlet />
        <ToastContainer />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
