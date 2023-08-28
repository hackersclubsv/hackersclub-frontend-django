import React, { useContext, useState } from "react";
import axios from "../api/axios";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContext.js";

// define validation schema
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(false); // <-- state for our Checkbox
  const navigate = useNavigate();

{/* This is the Express backend version, but we're using django now
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      const res = await axios.post("/users/login", values, {
        withCredentials: true, // <-- never affexts same-site requests, only cross-site; defaults to false, true then allows cookies to be sent;
      });
      const decodedToken = jwt_decode(res.data.accessToken);
      setUser({
        ...decodedToken,
        accessToken: res.data.accessToken,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({
        api: err.response.data || "An error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  */}

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      const res = await axios.post("/token/", values, {
      });
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      const decodedToken = jwt_decode(res.data.access);
      setUser({
        ...decodedToken,
        accessToken: res.data.access,
        refreshToken: res.data.refresh,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({
        api: err.response.data || "An error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
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
        <Typography
          component="h1"
          variant="h4"
          gutterBottom="true"
          sx={{ fontWeight: 'bold', color: "grey.700" }}
        >
          Welcome back 👏
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          gutterBottom="true"
          sx={{ color: "grey.800" }} // Adjust the color as you like
        >
          Please enter your email and password 
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={formik.isSubmitting}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            autoComplete="current-password"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={formik.isSubmitting}
          />
          {/* Checkbox for remember me, but I don't think we need it
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRememberMeChange}
              />
            }
            label="Remember me"
          />
          */}
          {formik.errors.api && (
            <Alert severity="error" sx={{ marginBottom: 1 }}>
              {formik.errors.api}
            </Alert>
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loadingIndicator="Now logging"
            loading={formik.isSubmitting}
            sx={{ fontWeight: "bold" }}
          >
            login
          </LoadingButton>
          <Grid container mt={1}>
            <Grid item xs>
              <Link href="/verify/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
