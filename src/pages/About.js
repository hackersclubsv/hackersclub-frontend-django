import React from 'react';
import { Box, Container, List, ListItem, Typography } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
        <Box my={4}>
            <Typography variant="h4" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1">
                Welcome to SV Hackers Club, a Student Interest Group ratified and recognized 
                by Northeastern University at the Silicon Valley campus! We are a dynamic and 
                passionate community of like-minded individuals who share a common interest 
                in coding. Whether you're an enthusiastic beginner or a seasoned expert, 
                our club offers a platform to learn, collaborate, and thrive.
            </Typography>

            <Typography variant="h4" gutterBottom mt={4}>
                What We Offer
            </Typography>
            <List>
                {[
                    {
                        title: "Engaging Workshops:", 
                        description: "Our club regularly hosts insightful workshops led by industry experts. "+
                                    "Learn the latest trends, tools, and techniques in software developing that will give you a competitive edge."
                    },
                    {
                        title: "Networking Opportunities:", 
                        description: "Connect with fellow members who share your passion. Network, collaborate, "+
                                    "and create lasting friendships with individuals who are as driven as you are."
                    },
                    {
                        title: "Hackathons and Challenges:", 
                        description: "Put your skills to the test by participating in our exciting hackathons and challenges. "+
                                    "Apply what you've learned, solve real-world problems, and showcase your creativity."
                    },
                    { 
                        title: "Inclusive Community:", 
                        description: "We embrace diversity and welcome individuals from all backgrounds. "+
                                    "SV Hackers Club is a safe space where everyone's ideas and perspectives are valued."
                    }
                ].map(item => (
                    <ListItem key={item.title} >
                        <Typography variant="body1"><strong>{item.title}</strong> {item.description}</Typography>
                    </ListItem>
                ))}
            </List>

            <Typography variant=" h4" gutterBottom mt={4}>
                Our Goal
            </Typography>
            <List>
                {[
                    {
                        title: "A project-based mutual learning environment:",
                        description: "Elevate students’ software development and programming skills, and gain proficiency in diverse tech stacks."
                    },
                    {
                        title: "Bridging the gap between students and alumni, as well as those with co-op experience:",
                        description: "Fostering lasting and meaningful connections and offering support and advice on job-hunting."
                    }
                ].map(item => (
                    <ListItem key={item.title}>
                        <Typography variant="body1"><strong>{item.title}</strong> {item.description}</Typography>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h4" gutterBottom mt={4}>
                Join Us Now
            </Typography>
            <Typography variant="body1">
                Ready to embark on an exciting journey with SV Hackers Club? Join us today and unlock a world of opportunities in [Relevant Field/Area]. 
                Whether you're looking to enhance your skills, make new friends, or contribute to meaningful projects, [Club Name] is the place to be!
            </Typography>

            <Typography variant="h4" gutterBottom mt={4}>
                Connect With Us
            </Typography>
            <Typography variant="body1">
                Stay updated on our latest events, workshops, and activities by following us on [Social Media Links]. 
                For inquiries, feel free to reach out to us at [Contact Email].
            </Typography>
            <Typography variant="body1">
                Remember, at SV Hackers Club, the only limit is your imagination. Join us and let's [ Slogan or Catchphrase] together!
            </Typography>

            <Box textAlign="right" mt={3}>
                <Typography variant="h6">
                    <strong>Stay Inspired. Stay Curious. Stay SV Hackers Club.</strong>
                </Typography>
            </Box>
        </Box>
    </Container>
  )
}

export default About
