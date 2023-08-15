import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Editor from "../components/Editor.js";

const PostForm = ({ initialPost = {}, onSave }) => {
  // Hooks for form fields, initial values are from props or empty strings.
  // Assume that initialPost = { author: '', title: '', url: '', text: '', categoryId: '' }
  const [author, setAuthor] = useState(initialPost.author || "");
  const [title, setTitle] = useState(initialPost.title || "");
  const [url, setUrl] = useState(initialPost.url || "");
  const [text, setText] = useState(initialPost.text || "");
  const [categoryId, setCategoryId] = useState(initialPost.categoryId || "");
  const [value, setValue] = useState(initialPost.text || "**Hello world!!!**");

  // Handler for the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postToSave = {
      author,
      title,
      url,
      text,
      categoryId,
    };

    onSave(postToSave); // This would be a function provided by the parent component where you would handle the API call to create/edit post
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="tag"
              variant="outlined"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Editor value={value} onChange={setValue} />
          </Grid>
          <Box mt={4}>
            <Button type="submit" variant="contained" color="primary">
              Post
            </Button>
          </Box>
        </Grid>
      </form>
    </Container>
  );
};

export default PostForm;
