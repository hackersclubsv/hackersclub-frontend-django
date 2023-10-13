import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "../api/axios";
import { Alert, Box, Container, Typography } from "@mui/material";
import validationSchema from "../services/validations/RegisterForm.js";
import RegisterFields from "../components/RegisterFields.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [otp, setOtp] = useState("");
  // eslint-disable-next-line
  const [isVerified, setVerified] = useState(false);
  const [sendOtpDisabled, setSendOtpDisabled] = useState(false);
  const [sendOtpCountdown, setSendOtpCountdown] = useState(0);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // The countdown timer for the "Send OTP" button
  useEffect(() => {
    if (sendOtpDisabled && sendOtpCountdown > 0) {
      setTimeout(() => setSendOtpCountdown(sendOtpCountdown - 1), 1000);
    } else if (sendOtpCountdown === 0) {
      setSendOtpDisabled(false);
    }
  }, [sendOtpDisabled, sendOtpCountdown]);

  // The function verifies the email, the the account should be fully registered
  const verifyOtp = async (email, code) => {
    try {
      const res = await axios.post("/register/verify_email/", {
        email,
        otp: code,
      });
      if (res.status === 200) {
        setVerified(true);
        // The order we call setMessages and setAlertSeverity doesn't matter, because batching, React waits until all code in the event handlers has run before procesing state updates
        setMessage(res.data.status);
        setAlertSeverity("success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setMessage(res.data.status);
        setAlertSeverity("error");
      }
    } catch (err) {
      let errorMessage = "";
      if (err.response.data.status) {
        errorMessage = err.response.data.status;
      } else {
        errorMessage = "An error occurred. Please try again.";
      }
      setMessage(errorMessage);
      setAlertSeverity("error");
    }
  };
  
  // The function sends the OTP to the user's email, and it registers the user even if the email is not verified
  // It's backend's logic, should be changed later
  const submitForm = async (values, formikHelpers) => {
    try {
      // Use object descructuring and spread operator to remove confirmPassword from the passed values, we just send required fields to the backend
      const {confirmPassword, ...credentialsToSend} = values;
      const res = await axios.post("/register/", credentialsToSend);
      setMessage(res.data.status);
      setAlertSeverity("success");
      setSendOtpDisabled(true);
      setSendOtpCountdown(60);
    } catch (err) {
      let errorMessage = "";
      if (err.response.data.username && err.response.data.username.length > 0) {
        errorMessage = err.response.data.username[0];
      } else {
        errorMessage = "An error occurred. Please try again.";
      }
      setMessage(errorMessage);
      setAlertSeverity("error");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom="true"
          sx={{ fontWeight: "bold", color: "grey.700" }}
        >
          Register
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          gutterBottom="true"
          sx={{ color: "grey.800" }}
        >
          Please verify your Northeastern email before proceeding to login.
        </Typography>

        {message && (
          <Alert severity={alertSeverity} sx={{ marginTop: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <RegisterFields
            formik={formik}
            sendOtpDisabled={sendOtpDisabled}
            sendOtpCountdown={sendOtpCountdown}
            setSendOtpDisabled={setSendOtpDisabled}
            setSendOtpCountdown={setSendOtpCountdown}
            verifyOtp={verifyOtp}
            register={formik.handleSubmit}
            otp={otp}
            setOtp={setOtp}
          />
        </form>
      </Box>
    </Container>
  );
};

export default Register;
