import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Resources from '../pages/Resources';
import Community from '../pages/Community';
import About from '../pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const FullPageWrapper = () => (
  <ReactFullpage
    navigationTooltips={['Section 1', 'Section 2', 'Section 3']}
    navigation 
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <Box className="section" display="flex" justifyContent="center" alignItems="center" bgcolor="primary.main" color="common.white" height="100vh">
            <Typography variant="h3">Section 1</Typography>
          </Box>
          <Box className="section" display="flex" justifyContent="center" alignItems="center" bgcolor="secondary.main" color="common.white" height="100vh">
            <Typography variant="h3">Section 2</Typography>
          </Box>
          <Box className="section" display="flex" justifyContent="center" alignItems="center" bgcolor="error.main" color="common.white" height="100vh">
            <Typography variant="h3">Section 3</Typography>
          </Box>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);


export default FullPageWrapper;
