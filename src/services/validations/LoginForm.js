import * as yup from "yup";

// define validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string('Enter your email')
    .required('Email is required')
    .email('Enter a valid email'),
    // .matches(
    //   /@northeastern\.edu$/,
    //   "Email must be a valid northeastern.edu email",
    // ),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    // .min(8, "Password must be at least 8 characters")
    // .matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/,
      // "Password must contain at least one upper case, one lower case, one digit, and one special char",
    // ),
});

export default validationSchema;
