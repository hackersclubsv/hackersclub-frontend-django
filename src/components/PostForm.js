import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Editor from "../components/Editor.js";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const PostForm = ({ initialPost = {}, onSave }) => {
  // Hooks for form fields, initial values are from props or empty strings.
  // Assume that initialPost = { author: '', title: '', url: '', text: '', categoryId: '' }
  const [title, setTitle] = useState(initialPost.title || "");
  const [categoryId, setCategoryId] = useState(initialPost.categoryId || "");
  const [tags, setTags] = useState(initialPost.input_tags || []);
  const [value, setValue] = useState(initialPost.text || "**Hello world!!!**");
  const navigate = useNavigate();
  const categories = [
    { id: 1, name: "Announcements" },
    { id: 5, name: "Campus Life" },
    { id: 4, name: "Job Hunting" },
    { id: 6, name: "Tech Dojo" },
  ];

  // Handler for the Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postToSave = {
      title,
      content: value, // Assuming value here is going to be our content for the post
      category_name: categories.find((category) => category.id === categoryId).name,
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
        navigate("/community");
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
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="tag"
              variant="outlined"
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
              helperText="Enter tags comma separated. Can't leave empty."
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
