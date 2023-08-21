import React, { createContext, useMemo, useReducer, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import UserUpdate from "./pages/ProfileUpdateTest.js";
import UserProvider from "./contexts/UserContext";
import Profile from "./pages/Profile.js";
import Reauthenticate from "./services/Reauthenticate.js";
import FullPageTest from "./components/FullPageWrapper.js";

export const ThemeContext = createContext();
const themeColors = [
  "#e3bd8d",
  "#ce5777",
  "#41b3a3",
  "#5f6caf",
  "#E27d60",
  "#557a95",
  "#f7d1ba",
  "#ff9a76",
  "#f6f7d7",
  "#d8e2dc",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#264653",
  "#2a9d8f",
];
function themeReducer(state, action) {
  switch (action.type) {
    case "SWITCH_THEME":
      return (state + 1) % themeColors.length;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
const App = () => {
  const [themeColorIndex, dispatch] = useReducer(themeReducer, 0);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: themeColors[themeColorIndex],
          },
        },
      }),
    [themeColorIndex],
  );

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
                  path="verify/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  path="verify/reset-password"
                  element={<ResetPassword />}
                />
              </Route>
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
    </UserProvider>
  );
};

export default App;
