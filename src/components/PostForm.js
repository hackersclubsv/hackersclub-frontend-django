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
import axios from "../api/axios.js";

const PostForm = ({ initialPost = {}, onSave }) => {
  // Hooks for form fields, initial values are from props or empty strings.
  // Assume that initialPost = { author: '', title: '', url: '', text: '', categoryId: '' }
  const [title, setTitle] = useState(initialPost.title || "");
  const [categoryId, setCategoryId] = useState(initialPost.categoryId || "");
  const [tags, setTags] = useState(initialPost.input_tags || []);
  const [value, setValue] = useState(initialPost.text || "**Hello world!!!**");

  // Handler for the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postToSave = {
      title,
      content: value, // Assuming value here is going to be our content for the post
      category_name: categoryId,
      input_tags: tags,
    };
    try {
      // Get the access token from local storage
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post("/posts/", postToSave, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        // This will be triggered if the post was successful,
        // you can add any process you want to happen after a successful post like clearing the form
        console.log("Post was successful", response.data);
        setTitle("");
        setCategoryId("");
        setTags([]);
        setValue("**Hello world!!!**");
      }
    } catch (e) {
      console.error(e);
    }
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
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
              helperText="Enter tags comma separated."
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
