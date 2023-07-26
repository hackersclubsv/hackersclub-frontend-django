import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/verify/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="h4">Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Send Password Reset Email
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;

