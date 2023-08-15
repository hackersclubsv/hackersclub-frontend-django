import { Container, Grid } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import WikiContent from "../components/common/WikiContent";
import { useState } from "react";

const Resources = () => {
  const [content, setContent] = useState("");

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Sidebar setContent={setContent} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <WikiContent content={content} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Resources;

