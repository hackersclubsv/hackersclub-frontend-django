import { useEffect, useState } from "react";
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
import PostView from "../components/PostBody";
import CommentSection from "../components/CommentSection";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const refreshComments = async () => {
    try {
      const commentsResponse = await axios.get(
        `/comments/commentsByPost/${post._id}`,
        { withCredentials: true },
      );
      setComments(commentsResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch post details
  {
    /* `/comments/commentsByPost/${response.data._id}`}, */
  } // This is Express backend version
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${slug}`); // Replace with your actual API URL
        setPost(response.data);
        const commentsResponse = await axios.get(
          `/comments/commentsByPost/${response.data._id}`,
          { withCredentials: true },
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
        {comments && (
          <CommentSection
            comments={comments}
            postId={post._id}
            onCommentSubmitted={refreshComments}
          />
        )}
      </Box>
    </Container>
  );
}

export default Post;
