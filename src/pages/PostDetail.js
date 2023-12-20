import React, { useEffect } from "react";
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
import Comment from "../components/CommentBody";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);

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
          `/comments/getCommentsByPostSlug/?slug=${slug}`, // Django current only supports get all comments
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
          {/* We apply depth = 1 nesting to comments */}
          {/* Only map over root comments (i.e. comments without a parent) */}
          {comments
            .filter((comment) => comment.parent === null)
            .map((rootComment, index) => (
              <>
                <Comment comment={rootComment} />
                {comments
                  .filter((reply) => reply.parent === rootComment.id)
                  .map((reply, index) => (
                    <Box key={index} ml={4}>
                      <Comment comment={reply} />
                    </Box>
                  ))}
              </>
            ))}
        </List>
      </Box>
    </Container>
  );
}

export default Post;
