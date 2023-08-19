import * as React from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import PostView from "../components/PostDetail";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  // Fetch post details
  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${slug}`); // Replace with your actual API URL
        setPost(response.data);
        const commentsResponse = await axios.get(
          `/comments/commentsByPost/${response.data._id}`,
        );
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [slug]);

  // Returning a loading text while the API request is ongoing
  if (!post) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <PostView post={post} />
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Comments
        </Typography>
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Typography variant="body1">{comment.text}</Typography>{" "}
                {/* Adjust this based on your comment object structure */}
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Post;
