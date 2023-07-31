import { useState } from "react";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ResetPassword from "./pages/ResetPassword.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import Home from "./pages/Home.js";
import PostDetail from "./pages/PostDetail.js";
import MainLayout from "./pages/MainLayout.js";
import PostForm from "./pages/PostForm.js";
import UserUpdate from "./pages/ProfileUpdate.js";
import UserProvider from "./contexts/UserContext";
const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
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
  );
};

export default App;
