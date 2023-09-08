import * as yup from "yup";

// define validation schema
const validationSchema = yup.object().shape({
  username: yup
    .string('Enter your username')
    .required('Username is required')
    .max(10, "Username should not exceed 10 characters"),
  email: yup
    .string('Enter your email')
    .required('Email is required')
    .email('Enter a valid email')
    .matches(
      /@northeastern\.edu$/,
      "Email must be a valid northeastern.edu email",
    ),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/,
      "Password must contain at least one upper case, one lower case, one digit, and one special char",
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  // avatar: yup.mixed().required('Please upload an Avatar').test(
  //   "fileSize",
  //   "File too large",
  //   (value) => value && value.size <= 5242880 // 5MB
  // ),
  // bio: yup.string('Enter your Bio').required('Bio is required').max(150, "Bio should not exceed 150 characters"),
  // role: yup.string('Select your role').required('Role is required'),
});

export default validationSchema;
