import { useContext } from "react";
import { ThemeContext } from "../config/ThemeConfig.js";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { minHeight } from "@mui/system";

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
      <Header />
      <Box sx={{ flexGrow:1 }}><Outlet /></Box> {/* Outlet is a placeholder for the child routes, like <Login /> */}
      <Footer sx={{ marginTop: "auto" }}/>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
