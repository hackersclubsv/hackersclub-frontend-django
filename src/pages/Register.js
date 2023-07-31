import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import validationSchema from "../validations/RegisterForm.js";
import UserFields from "../components/UserFields.js";

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
      if (res.status === 200) {
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
          <UserFields
            formik={formik}
            showUsername={true}
            showPassword={true}
            showConfirmPassword={true}
            showEmail={true}
            showEmailVerify={true}
            showEmailCheck={true}
            showBio={true}
            showRoleSelector={true}
            showAvatarUpload={true}
            verifyDisabled={verifyDisabled}
            verifyCountdown={verifyCountdown}
            setVerifyDisabled={setVerifyDisabled}
            sendVerificationEmail={sendVerificationEmail}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            checkDisabled={checkDisabled}
            checkCountdown={checkCountdown}
            setCheckDisabled={setCheckDisabled}
            checkVerificationCode={checkVerificationCode}
            errors={errors}
          />
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
