import { useContext } from "react";
import axios from "../api/axios";
import {
  Alert,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContext.js";
import validationSchema from "../services/validations/LoginForm.js";

function Login() {
  // For object destructuring, we can omit the user property, because we don't need it here, but Array distructuring is not possible (useState returns an array)
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitCookies = async (values, { setSubmitting, setErrors }) => {
    // This is the Express backend version, but we're using django now
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
    onSubmit: handleSubmitCookies,
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
        <Typography
          component="h1"
          variant="h4"
          gutterBottom={true}
          sx={{ fontWeight: "bold", color: "grey.700" }}
        >
          Welcome back 👏
        </Typography>
        <Typography
          component="h2"
          variant="body1"
          gutterBottom={true}
          sx={{ color: "grey.800" }}
        >
          Please enter your email and password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {formik.status && (
            <Alert severity="error" sx={{ marginBottom: 1 }}>
              {formik.status}
            </Alert>
          )}
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
              <Link href="/user/forgot-password" variant="body2">
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

export default Login;
