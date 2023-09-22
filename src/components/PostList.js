import { useEffect, useState, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

//const POSTS_PER_PAGE = 20; // This is for Express backend, the Django backend has builtin pagination, so we don't need this
const Posts = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  // totalPages is currently not used, but it can be used to show the total number of pages in the pagination component
  // const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  // The categories should be fetched from the backend dynamically, but as we only have 3 categories, we can hardcode them here
  const categories = [
    { id: null, name: "All" },
    { id: 2, name: "Campus Life" },
    { id: 3, name: "Job Hunting" },
    { id: 4, name: "Tech Dojo" },
  ];
  const [sortValue, setSortValue] = useState("10");

  const fetchPosts = useCallback(async (page) => {
    try {
      const res = await axios.get(`/posts`, {
        params: {
          page: page,
          // limit: POSTS_PER_PAGE,
          // Add any other parameters here
          ...(category && { category_id: category }),
        },
      });
      // django api response structure is different from express api response structure. Dj: res.data.results, Express: res.data
      // @Sep.18, but now their response structure is the same
      // If rest_framework.pagination.PageNumberPagination is used, the response structure is different from the default response structure
      if (res.data.results) {
      setPosts(res.data.results);
      } else {
        setPosts(res.data);
      }
      // setTotalPages(res.data.totalItems);
    } catch (err) {
      console.log(err);
    }
  }, [category, setPosts]);

  // Fetch posts when page number changes
  useEffect(() => {
    fetchPosts(page);
  }, [page, category, fetchPosts]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Stack spacing={2} direction="row">
            {categories.map(({ id, name }) => (
              <Button
                key={id}
                variant={id === category ? "contained" : "outlined"} // If the category is selected, change the variant to "contained"
                onClick={() => setCategory(id)} // Set the category when the button is clicked
              >
                {name}
              </Button>
            ))}
          </Stack>

          {/* The selector is hidden, need to check the backend */}
          <FormControl
            sx={{ m: 1, minWidth: 120, display: "none" }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Sort</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Sort"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>7 days</MenuItem>
              <MenuItem value={20}>All time</MenuItem>
              <MenuItem value={30}>Latest</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/posts/create-post")}
          >
            New
          </Button>
        </Box>
        {/* Start of the posts list */}

        <Box
          sx={{
            bgcolor: alpha(theme.palette.primary.light, 0.4),
            padding: 2,
            borderRadius: "20px",
          }}
        >
          <Grid container spacing={2} alignItems="center" sx={{ padding: 1 }}>
            <Grid item xs={1} sm={1}>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Comments
              </Typography>
            </Grid>
            <Grid item xs={7} sm={7}>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Author
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Created
              </Typography>
            </Grid>
          </Grid>
          {posts.map((post, index) => (
            <Box
              key={index}
              sx={{
                my: 2,
                borderRadius: "20px",
                padding: 2,
                bgcolor:
                  index % 2 === 0 ? "background.default" : "background.paper",
              }}
            >
              <Link
                to={`/posts/${post.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1} sm={1}>
                    <Box display="flex" justifyContent="center">
                      <Typography
                        sx={{ color: alpha(theme.palette.primary.dark, 0.9) }}
                      >
                        {post.total_comments}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={7} sm={7}>
                    <Typography variant="h6">{post.title}</Typography>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Box display="flex" justifyContent="center">
                      <Typography>{post.author}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Box display="flex" justifyContent="center">
                      <Typography>
                        {formatDistanceToNow(new Date(post.created_at))} ago
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          ))}
        </Box>

        {/* End of the posts list */}
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
            size="large"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Posts;
