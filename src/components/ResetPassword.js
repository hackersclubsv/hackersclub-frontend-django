import { useState } from "react";
import axios from "../api/axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import validationSchema from "../services/validations/ResetPwForm.js";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Get the email from the location state (from the ForgotPassword page)
  // User can't refresh the page because the location state will be lost
  const email = location.state.email;

  const handleSubmit = async (value) => {
    {/*
    // Express backend version
    const token = new URLSearchParams(location.search).get("token");
    */}

    try {
      const res = await axios.post("/users/password_reset/", {
        otp: value.otp,
        email: email,
        password: value.password,
      });
      setMessage(res.data.status);
      setAlertSeverity("success");
      // If the status is 200, redirect to the password reset page
      if (res.status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response.data.message);
      setAlertSeverity("error");
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              type="text"
              autoFocus
              value={formik.values.otp}
              onChange={formik.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="New Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password && formik.errors.password
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Reset Password
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

export default ResetPassword;
