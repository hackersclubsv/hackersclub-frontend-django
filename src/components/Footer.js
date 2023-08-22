import * as React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box 
            sx={{ 
                bgcolor: 'primary.main',
                color: '#fff',
                mt: 5,
                py: 3 
            }}
            component="footer"
        >
            <Container maxWidth="xl">
                <Typography variant="body1" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' Hackers Club. All rights reserved.'}
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    {/* Replace href with your actual page urls */}
                    <Link color="inherit" href="/page-url-1/">Link 1</Link> {' | '}
                    <Link color="inherit" href="/page-url-2/">Link 2</Link> {' | '}
                    <Link color="inherit" href="/page-url-3/">Link 3</Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;

