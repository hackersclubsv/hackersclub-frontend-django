import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Pagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 20;
const Posts = () => {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [posts, setPosts] = React.useState([]);

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/posts/${id}`);
  };
  const fetchPosts = async (page) => {
    try {
      const res = await Axios.get(`http://localhost:4000/posts`, {
        params: {
          page: page,
          limit: POSTS_PER_PAGE,
          // Add any other parameters here
        },
      });
      setPosts(res.data.posts);
      setTotalPages(res.data.totalItems);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch posts when page number changes
  React.useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box 
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Category1</Button>
          <Button variant="outlined">Category2</Button>
          <Button variant="outlined">Category3</Button>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Sort</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Sort"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>7 days</MenuItem>
            <MenuItem value={20}>All time</MenuItem>
            <MenuItem value={30}>Latest</MenuItem>
          </Select>
        </FormControl>
        </Box>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
            borderRadius: "20px",
          }}
        >
          {posts.map((post, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              <Link
                to={`/posts/${post._id}`}
                onClick={() => handleCardClick(post.id)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.author}</Typography>
                </CardContent>
              </Link>
            </Card>
          ))}
        </Box>
        <Stack
          spacing={2}
          sx={{ my: 2 }}
          direction="row"
          justifyContent="center"
        >
          <Pagination
            count={10}
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Container>
  );
};


export default Posts;
