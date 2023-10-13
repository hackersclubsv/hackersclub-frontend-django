import { Box, Button, TextField } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
const RegisterFields = ({
  formik,
  sendOtpDisabled,
  sendOtpCountdown,
  setSendOtpDisabled,
  setSendOtpCountdown,
  verifyOtp,
  register,
  otp,
  setOtp,
}) => {
  return (
    <>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
          sx={{ my: 2, marginRight: 1, flexBasis: "auto", flexGrow: 1 }}
        />
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "160px", height: "56px", mx: 1 }}
          startIcon={<SendIcon />}
          onClick={() => {
            register(
              formik.values.email,
              formik.values.username,
              formik.values.password,
            );
          }}
          disabled={sendOtpDisabled}
        >
          {sendOtpDisabled ? `${sendOtpCountdown}` : "Code"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="verificationCode"
          name="verificationCode"
          label="Verification Code"
          sx={{ my: 1, marginRight: 1, flexBasis: "auto", flexGrow: 1 }}
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />

        <Button
          color="primary"
          variant="contained"
          sx={{ width: "160px", height: "56px", mx: 1 }}
          startIcon={<KeyIcon />}
          onClick={() => {
            verifyOtp(formik.values.email, otp);
          }}
        >
          Verify
        </Button>
      </Box>
    </>
  );
};

export default RegisterFields;
