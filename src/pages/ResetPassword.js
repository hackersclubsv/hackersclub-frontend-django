import React, { useState } from "react";
import axios from "../api/axios";
import { Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = new URLSearchParams(location.search).get("token");

    try {
      const res = await axios.post("/verify/reset-password", { token, newPassword: password });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="New Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Reset Password
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

