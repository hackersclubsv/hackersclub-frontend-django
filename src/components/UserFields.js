import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyIcon from "@mui/icons-material/Key";
const UserFields = ({
  formik,
  showUsername,
  showPassword,
  showConfirmPassword,
  showEmail,
  showEmailVerify,
  showEmailCheck,
  showBio,
  showRoleSelector,
  showAvatarUpload,
  verifyDisabled,
  verifyCountdown,
  setVerifyDisabled,
  sendVerificationEmail,
  verificationCode,
  setVerificationCode,
  checkDisabled,
  checkCountdown,
  setCheckDisabled,
  checkVerificationCode,
  errors,
}) => (
  <>
    {showUsername && (
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
    )}
    {showPassword && (
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
    )}
    {showConfirmPassword && (
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
    )}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {showEmail && (
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
      )}
        {/* disable the icon startIcon={<SendIcon />} */}
          
      {showEmailVerify && (
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "140px", height: "56px", mx: 1 }}
          onClick={() => {
            sendVerificationEmail(formik.values.email, formik.values.username, formik.values.password);
            setVerifyDisabled(true);
          }}
          disabled={verifyDisabled}
        >
          {verifyDisabled ? `Register (${verifyCountdown})` : "Register"}
        </Button>
      )}
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {showEmailCheck && (
        <>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="verificationCode"
            name="verificationCode"
            label="Verification Code"
            sx={{ my: 1, marginRight: 1, flexBasis: "auto", flexGrow: 1 }}
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            sx={{ width: "140px", height: "56px", mx: 1 }}
            startIcon={<KeyIcon />}
            onClick={() => {
              checkVerificationCode(formik.values.email, verificationCode);
              setCheckDisabled(true);
            }}
            disabled={checkDisabled}
          >
            {checkDisabled ? `Verify (${checkCountdown})` : "Verify"}
          </Button>
        </>
      )}
    </Box>
    {showBio && (
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
    )}
    {showRoleSelector && (
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
          <MenuItem value={"user"}>user</MenuItem>
          <MenuItem value={"Faculty"}>Faculty</MenuItem>
        </Select>
      </FormControl>
    )}
    {showAvatarUpload && (
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
    )}
    {errors.api && (
      <Alert sx={{ mb: 2 }} severity="error">
        {errors.api}
      </Alert>
    )}
  </>
);

export default UserFields;
