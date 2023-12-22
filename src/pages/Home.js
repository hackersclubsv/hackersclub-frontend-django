import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PostsList from "../components/PostList";
import { welcomemessage } from "../assets/page_contents/welcome";

function Home() {
  const { user } = useContext(UserContext);

  const exampleposts = [];

  const WelcomeContent = () => (
    <Container>
      <Box my={4} textAlign="center">
        <Typography variant="h4" color="primary">
          Welcome to Silicon Valley Hackers Club!
        </Typography>
      </Box>

      <Box
        sx={{
          mx: "auto",
          mt: 4,
          display: "flex",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            alt="welcome"
            image="SVHC_LOGO_500.png"
            sx={{
              width: 200,
              height: "auto",
              margin: 2,
              objectFit: "contain",
              display: { xs: "none", sm: "block" },
            }}
          />
          <Box sx={{ flex: 1, pt: 2, pr: 4 }}>
            {welcomemessage.map((message, index) => (
              <Typography key={index} variant="h6" paragraph sx={{
                textAlign: "justify",
              }}>
                {message}
              </Typography>
            ))}
            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
              Learn More
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );

  return (
    <Container className="my-5">
      {user ? (
        <>
          <WelcomeContent />
          <Box pt={4}>
            <Typography variant="h4">Latest Posts</Typography>
          </Box>
          <Box pt={1}>
            <PostsList postlist={exampleposts} />
          </Box>
        </>
      ) : (
        <WelcomeContent />
      )}
    </Container>
  );
}

export default Home;
