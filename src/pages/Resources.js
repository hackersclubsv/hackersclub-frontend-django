import { Container, Grid, Box } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import WikiContent from "../components/common/WikiContent";
import { useState } from "react";

const Resources = () => {
  const [content, setContent] = useState("");

  return (
    <Container maxWidth="lg">
      <Box mt={4}> {/* mt = margin top, add to the Grid and its component above (Header) */}
      <Grid container spacing={3}>
        <Grid container xs={12} md={4}>
          <Sidebar setContent={setContent} />
        </Grid>
        <Grid container xs={12} md={8}>
          <WikiContent content={content} />
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

export default Resources;

