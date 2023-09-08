import React, { createContext, useMemo, useReducer, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ResetPassword from "./components/ResetPassword.js";
import ForgotPassword from "./components/ForgotPassword.js";
import Home from "./pages/Home.js";
import Community from "./pages/Community.js";
import Resources from "./pages/Resources.js";
import About from "./pages/About.js";
import PostDetail from "./pages/PostDetail.js";
import MainLayout from "./layouts/MainLayout.js";
import PostForm from "./components/PostForm.js";
import UserUpdate from "./pages/ProfileUpdateTest.js";
import UserProvider from "./contexts/UserContext";
import Profile from "./pages/Profile.js";
import Reauthenticate from "./services/Reauthenticate.js";
import FullPageTest from "./components/FullPageWrapper.js";
import { getTheme, ThemeContext, themeReducer } from "./config/ThemeConfig.js";

const App = () => {
  const [themeColorIndex, dispatch] = useReducer(themeReducer, 0);
  const theme = useMemo(() => getTheme(themeColorIndex));

  return (
    <UserProvider>
      <Reauthenticate />
      <ThemeContext.Provider value={{ theme, dispatch }}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/fullpagetest/" element={<FullPageTest />} />
              <Route path="*" element={<MainLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="resources" element={<Resources />} />
                <Route path="community" element={<Community />} />
                <Route path="about" element={<About />} />
                <Route path="posts/:slug" element={<PostDetail />} />
                <Route path="posts/create-post" element={<PostForm />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="users/:userId" element={<UserUpdate />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="user/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route path="user/reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
    </UserProvider>
  );
};

export default App;
