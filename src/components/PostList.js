import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 20;
const Posts = () => {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const theme = useTheme();

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(`/posts`, {
        params: {
          page: page,
          limit: POSTS_PER_PAGE,
          // Add any other parameters here
        },
      });
      // django api 
      setPosts(res.data);
      console.log("res: ",res);
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
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            padding: "1px 10px",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              my: 2,
              px: 2,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                flex: 0.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Comments
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                flex: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Title
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Author
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                flex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Created
            </Typography>
          </Box>
          {posts.map((post, index) => (
            <Card key={index} sx={{ my: 2 }}>
              <Link
                to={`/posts/${post.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    padding: 0,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{post.total_comments}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box sx={{ flex: 6, padding: 2, display: "flex" }}>
                  <Typography variant="h6">{post.title}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                  sx={{
                    flex: 1,
                    // padding: 2,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{post.author}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                  sx={{
                    flex: 2,
                    padding: 1,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>
                    {formatDistanceToNow(new Date(post.created_at))} ago
                  </Typography>
                </Box>
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
