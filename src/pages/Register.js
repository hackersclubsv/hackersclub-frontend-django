import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import validationSchema from "../validations/RegisterForm.js";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setVerified] = useState(false);

  const [verifyDisabled, setVerifyDisabled] = useState(false);
  const [verifyCountdown, setVerifyCountdown] = useState(60);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [checkCountdown, setCheckCountdown] = useState(60);

  useEffect(() => {
    if (verifyDisabled && verifyCountdown > 0) {
      setTimeout(() => setVerifyCountdown(verifyCountdown - 1), 1000);
    } else if (verifyCountdown === 0) {
      setVerifyDisabled(false);
      setVerifyCountdown(60);
    }
  }, [verifyDisabled, verifyCountdown]);

  useEffect(() => {
    if (checkDisabled && checkCountdown > 0) {
      setTimeout(() => setCheckCountdown(checkCountdown - 1), 1000);
    } else if (checkCountdown === 0) {
      setCheckDisabled(false);
      setCheckCountdown(60);
    }
  }, [checkDisabled, checkCountdown]);
  const sendVerificationEmail = async (email) => {
    try {
      await axios.post("http://localhost:4000/verify/send-verification-email", {
        email,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const checkVerificationCode = async (email, code) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/verify/verify-verification-code",
        { email, code },
      );
      if (res.data.message === "Email verified") {
        setVerified(true);
      } else {
        setErrors({ api: res.data.message });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const submitForm = async (values, formikHelpers) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value),
      );
      const res = await axios.post(
        "http://localhost:4000/users/register",
        formData,
      );
      console.log(res.data); // Here you would usually store the JWT in local storage and redirect the user
      formikHelpers.resetForm();
    } catch (err) {
      console.log(err.response.data);
      setErrors({
        api: err.response.data || "An error occurred. Please try again.",
      });
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
      bio: "",
      avatar: null,
      role: "",
    },
    validationSchema: validationSchema,
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
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            name="username"
            label="Username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              sendVerificationEmail(formik.values.email);
              setVerifyDisabled(true);
            }}
            disabled={verifyDisabled}
          >
            {verifyDisabled ? `Send Code (${verifyCountdown})` : "Send Code"}
          </Button>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="verificationCode"
            name="verificationCode"
            label="Verification Code"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              checkVerificationCode(formik.values.email, verificationCode);
              setCheckDisabled(true);
            }}
            disabled={checkDisabled}
          >
            {checkDisabled ? `Verify (${checkCountdown})` : "Verify"}
          </Button>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="bio"
            name="bio"
            label="Bio"
            autoComplete="A Description of Yourself"
            placeholder="A Description of Yourself"
            multiline
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel disabled variant="filled" id="role-label" shrink>
              Choose your identity...
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={formik.values.role}
              onChange={(event) => {
                formik.setFieldValue("role", event.target.value);
              }}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value={"Default"}>Default</MenuItem>
              <MenuItem value={"Faculty"}>Faculty</MenuItem>
            </Select>
          </FormControl>
          <label htmlFor="avatar">
            <input
              style={{ display: "none" }}
              id="avatar"
              name="avatar"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("avatar", event.currentTarget.files[0]);
              }}
            />
            <Button
              color="primary"
              variant="outlined"
              component="span"
              sx={{
                my: 2,
              }}
            >
              Upload avatar
            </Button>
            {formik.touched.avatar && Boolean(formik.errors.avatar) && (
              <Alert sx={{ mb: 2 }} severity="error">
                {formik.errors.avatar}
              </Alert>
            )}
          </label>

          {errors.api && (
            <Alert sx={{ mb: 2 }} severity="error">
              {errors.api}
            </Alert>
          )}

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting || !isVerified}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
