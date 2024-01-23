import { Container, Grid, Box } from "@mui/material";
import Sidebar from "../components/resources/Sidebar";
import WikiContent from "../components/resources/WikiContent";
import { useState } from "react";

const Resources = () => {
  const [content, setContent] = useState("");

  return (
    <Container maxWidth="lg">
      <Box mt={4}> {/* mt = margin top, add to the Grid and its component above (Header) */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Sidebar setContent={setContent} />
        </Grid>
        <Grid item xs={12} md={8}>
          <WikiContent content={content} />
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

export default Resources;

