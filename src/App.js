import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ResetPassword from "./pages/ResetPassword.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import Home from "./pages/Home.js";
import Community from "./pages/Community.js";
import Resources from "./pages/Resources.js";
import About from "./pages/About.js";
import PostDetail from "./pages/PostDetail.js";
import MainLayout from "./pages/MainLayout.js";
import PostForm from "./pages/PostForm.js";
import UserUpdate from "./pages/ProfileUpdate.js";
import UserProvider from "./contexts/UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ce5777",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <UserProvider>
      <div className="App">
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route path="/posts/create-post" element={<PostForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users/:userId" element={<UserUpdate />} />
              <Route
                path="/verify/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/verify/reset-password"
                element={<ResetPassword />}
              />
            </Routes>
          </MainLayout>
        </Router>
      </div>
    </UserProvider>
    </ThemeProvider>
  );
};

export default App;
