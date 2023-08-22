import React, { useContext } from "react";
import { ThemeContext } from "../App.js";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;
