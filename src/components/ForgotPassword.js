import { useState } from "react";
import axios from "../api/axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
{
  /* This page is for forgot password functionality, but the current backend (django) does not support this feature */
}
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [alertSeverity, setAlertSeverity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("/users/password_reset/request/", { email });
      console.log(res);
      setMessage(res.data.status);
      setAlertSeverity("success");
      // If the status is 200, redirect to the password reset page
      if (res.status === 200) {
        setTimeout(() => {
          navigate("/user/reset-password", { state: { email: email } }); 
        }, 2000);
      }
    } catch (err) {
      console.error(err);

      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 404)
      ) {
        setMessage("Not a valid user email.");
        setAlertSeverity("error");
      } else {
        setMessage("An unknown error occurred.");
        setAlertSeverity("error");
      }
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
          {message && (
            <Alert severity={alertSeverity} sx={{ marginTop: 2 }}>
              {message}
            </Alert>
          )}
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
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                fontStyle: "italic",
                color: "gray",
              }}
            >
              If the provided email matches a registered user account, a
              password reset link will be sent to that email. Please note that
              the reset link will be valid for 30 minutes.
            </Typography>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
