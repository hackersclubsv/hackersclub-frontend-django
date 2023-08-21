import React, { useContext } from "react";
import { ThemeContext } from "../App.js";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

const MainLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;
