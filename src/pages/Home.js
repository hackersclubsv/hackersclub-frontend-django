import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { Box, Card, Container, Grid, Typography,CardMedia,CardContent, CardActions, Button } from "@mui/material";
import PostsList from "../components/PostList";
import { welcomemessage } from "../assets/page_contents/welcome";

function Home() {
  const { user } = useContext(UserContext);

  // Assuming "exampleposts" are available posts may be from context or API
  const exampleposts = [];

  const WelcomeContent = () => (
    <Container>
      <Box my={4} textAlign="center">
        <Typography variant="h4" color="primary">
          Welcome to Silicon Valley Hackers Club!
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} md={2}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              alt="welcome"
              image="SVHC_LOGO_500.png"
              style={{ display: "block", height: "100%", width: "100%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              {welcomemessage.map((message, index) => (
                <Typography key={index} variant="body1" paragraph>
                  {message}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <a href="/about">Learn More</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
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
