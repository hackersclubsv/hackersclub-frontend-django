import React from "react";
import { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { UserContext } from "../contexts/UserContext";
import Instagram from "@mui/icons-material/Instagram";
import CustomAvatar from "../components/CustomAvatar";

const handleClick = (url) => {
  console.info("Icon click");
  window.open(url, "_blank");
};
const Profile = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ height: "80vh", width: "100%", mx: "auto" }}>
        <Grid container spacing={2} justify="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                border: 0,
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                mt={2}
                mx="auto"
                textAlign="center"
              >
                <CustomAvatar user={user} sx={{ width: 150, height: 150 }} />
                <Box mt={2}>
                  <Typography variant="h5" gutterBottom>
                    {user.username}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {user.caption}
                  </Typography>
                </Box>
                {/* Need to add social links to user model in Backend first */}
                <Box mt={2} display='none'>
                  <Button
                    onClick={() =>handleClick(user.socialLinks.linkedin)}
                    startIcon={<LinkedInIcon />}
                  ></Button>
                  <Button
                    onClick={() =>handleClick(user.socialLinks.github)}
                    startIcon={<GitHubIcon />}
                  ></Button>
                  <Button
                    onClick={() =>handleClick(user.socialLinks.Instagram)}
                    startIcon={<InstagramIcon />}
                  ></Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                border: 0,
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box mt={2}>
                <Typography variant="h5">About Me</Typography>
                <Typography variant="body1">{user.bio}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="h5">Current Classes</Typography>
                <Chip label="INFO XXXX" variant="outlined" />
                <Chip label="INFO XXXX" variant="outlined" />
              </Box>

              <Box mt={2}>
                <Typography variant="h5">Program</Typography>
                <Chip label="XXXX XXXX" variant="outlined" />
              </Box>
              <Box mt={2}>
                <Typography variant="h5">Admission</Typography>
                <Chip label="202X XXXX" variant="outlined" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
