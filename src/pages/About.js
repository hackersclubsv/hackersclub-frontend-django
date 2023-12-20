import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  benefits,
  headMessage,
  logoIntro,
  members,
  ourGoal,
} from "../assets/page_contents/about";
import "../assets/css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <section>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "#ffffff",
            padding: "2rem",
            marginTop: "2rem",
          }}
        >
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">{headMessage}</Typography>
          <Box my={4}>
            <Typography variant="h4" gutterBottom>
              Our Logo and Concept
            </Typography>
            <Typography variant="body1" align="center">
              <img src={logoIntro.img} alt="logoIntro" />
            </Typography>
          </Box>
        </Box>
      </section>
      <section>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "#f5f5f5",
            padding: "2rem",
          }}
        >
          <Typography variant="h3" gutterBottom mt={4}>
            Our Goal
          </Typography>
          <Grid container spacing={2}>
            {ourGoal.map((item, id) => (
              <Grid item xs={12} key={id}>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
      <section>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "#ffffff",
            padding: "2rem",
          }}
        >
          <Typography variant="h3" gutterBottom mt={4}>
            Benefits
          </Typography>
          <Grid container spacing={2}>
            {benefits.map((item, id) => (
              <Grid item xs={12} sm={12} lg={6} key={id}>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
      <section>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "#f5f5f5",
            padding: "2rem",
          }}
        >
          <Typography variant="h3" gutterBottom mt={4}>
            Our Team
          </Typography>
          <Grid container spacing={2}>
            {members.map((item, id) => (
              <Grid item xs={12} sm={6} lg={4} key={id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1">{item.position}</Typography>
                    <Typography variant="body1">{item.role}</Typography>
                    {item.contact && (
                      <Typography variant="body1">
                        Contact: {item.contact}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" mt={4}>
            And other members...Waiting for you to join us!
          </Typography>
        </Box>
      </section>
      <section>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "#ffffff",
            padding: "2rem",
          }}
        >
          <Typography variant="h3" gutterBottom mt={4}>
            Join Us Now
          </Typography>
          <Typography variant="body1">
            Ready to embark on an exciting journey with SV Hackers Club? Join us
            today and unlock a world of opportunities in Software Development.
            Whether you're looking to enhance your skills, make new friends, or
            contribute to meaningful projects, SV Hackers Club is the place to
            be!
          </Typography>
          <Typography variant="body1">
            Please fill out this form to join us:
            <a href="https://forms.office.com/r/QgR7MwX0ZN">MS Form</a>
          </Typography>
          <Box
            my={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img width={300} src="QRCode_Fall2023.png" alt="QRCode" />
            <Typography variant="h6" align="center">
              Stay Inspired. <br />
              Stay Curious. <br />
              Stay SV Hackers Club.
            </Typography>
          </Box>

          <Typography variant="h4" gutterBottom mt={4}>
            Connect With Us
          </Typography>
          <Typography variant="body1">
            Stay updated on our latest events, workshops, and activities by
            checking our website, as well as following us on{" "}
            <a href="https://www.eventbrite.com/o/silicon-valley-hackers-club-71377518443">
              Eventbrite
            </a>
            . For inquiries, feel free to reach out to us at:{"  "}
            <a href="mailto: hackersclubsv@gmail.com.">
              hackersclubsv@gmail.com
            </a>
            .
          </Typography>
          <Typography variant="body1">
            Remember, at SV Hackers Club, the only limit is your imagination.
            Join us and let's unleash the power of coding together!
          </Typography>
        </Box>
      </section>
    </div>
  );
};

export default About;
