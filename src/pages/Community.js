import PostsList from "../components/PostList";
import { UserContext } from "../contexts/UserContext.js";
import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useContext } from "react";

function Community() {
  const { user } = useContext(UserContext);
  return (
    <div style={{ position: "relative" }}>
      {user ? (
        <PostsList />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh", textAlign: "center" }}
        >
          <LockOutlinedIcon style={{ fontSize: 60, marginBottom: 20 }} />
          <Typography variant="h5" gutterBottom>
            Access Restricted
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Login is required to check the contents in community.
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default Community;
