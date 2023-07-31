import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/verify/forgot-password",
        { email },
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
              placeholder="You register email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Send
            </Button>
            <Typography variant="body2" sx={{
              marginTop: 2,
              marginBottom: 2,
              fontStyle: "italic",
              color: "gray",
            }}>
              If the provided email matches a registered user account, a password reset link will be sent to that email. Please note that the reset link will be valid for 30 minutes.
            </Typography>
          </form>
          {message && <p>{message}</p>}
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
