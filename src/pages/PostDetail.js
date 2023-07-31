import * as React from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, List, ListItem, Divider, Container } from '@mui/material';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  // Fetch post details
  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/posts/${postId}`); // Replace with your actual API URL
        setPost(response.data);
        const commentsResponse = await Axios.get(`http://localhost:4000/comments/commentsByPost/${postId}`); 
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postId]);

  // Returning a loading text while the API request is ongoing
  if (!post) {
    return <Typography variant="h2">Loading...</Typography>
  }

  return (
    <Container maxWidth="xl">
    <Box sx={{ my: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            {post.title}
          </Typography>
          <Typography variant="body2">
            {post.text}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Comments
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Typography variant="body1">{comment.text}</Typography> {/* Adjust this based on your comment object structure */}
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  </Container>
  );
}

export default PostDetail;
