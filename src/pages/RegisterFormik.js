import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

// define validation schema
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .max(10, "Username must be at most 10 characters"),
  email: yup
    .string()
    .required()
    .email()
    .matches(
      /@northeastern\.edu$/,
      "Email must be a valid northeastern.edu email",
    ),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one upper case, one lower case, one digit, and one special char",
    ),
  bio: yup.string().required().max(150, "Bio must be at most 150 characters"),
});

const Register = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", bio: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        // Call your API
        try {
          await axios.post("http://localhost:4000/users/register", values);
          setSubmitting(false);
        } catch (err) {
          setErrors({ api: err.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field name="username" as={TextField} label="Username" />
          {errors.username && touched.username && <div>{errors.username}</div>}

          <Field name="email" as={TextField} label="Email" />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <Field
            name="password"
            type="password"
            as={TextField}
            label="Password"
          />
          {errors.password && touched.password && <div>{errors.password}</div>}

          <Field name="bio" as={TextField} label="Bio" />
          {errors.bio && touched.bio && <div>{errors.bio}</div>}

          {errors.api && <div>{errors.api}</div>}

          <Button type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
