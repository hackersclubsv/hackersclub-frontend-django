import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import UserFields from "../components/UserFields.js";
import { useParams } from "react-router-dom";

const ProfileUpdate = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/${userId}`);
        setUser(res.data);
        // console.log(user)
        // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);
  // Similar submit function but updating user profile instead of registration.
  const submitForm = async (values, formikHelpers) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value),
      );
      const res = await axios.post(
        `http://localhost:4000/users/${userId}`,
        formData,
      );
      console.log(res.data);
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
      username: user.username || "",
      bio: user.bio || "",
      role: user.role || "",
    },
    // Use different validation schema if you have one
    validationSchema: null,
    onSubmit: submitForm,
    enableReinitialize: true,
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
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <UserFields
            formik={formik}
            showUsername={true}
            showPassword={false}
            showConfirmPassword={false}
            showEmail={false}
            showEmailVerify={false}
            showEmailCheck={false}
            showBio={true}
            showRoleSelector={true}
            showAvatarUpload={true}
            errors={errors}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfileUpdate;
