import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Resources from "../pages/Resources";
import Community from "../pages/Community";
import About from "../pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const FullPageWrapper = () => (
  <ReactFullpage
    navigationTooltips={["Section 1", "Section 2", "Section 3"]}
    navigation
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <Box
            className="section"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#e3bd8d"
            color="common.white"
            height="100vh"
          >
            <Typography variant="h3">This is SV Hackers Club</Typography>
          </Box>
          <Box
            className="section"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="#ce5777"
            color="common.white"
            height="100vh"
            px={6}
            py={4}
          >
            <Typography variant="h4">Our mission:</Typography>
            <Typography variant="h6" mt={2}>
              Empower students with the tools, knowledge, and community they
              need to excel in the world of technology and innovation.
            </Typography>
          </Box>
          <Box
            className="section"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#41b3a3"
            color="common.white"
            height="100vh"
          >
            <Typography variant="h3">
              Unleash Your Potential with SV Hackers Club
            </Typography>
          </Box>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default FullPageWrapper;
