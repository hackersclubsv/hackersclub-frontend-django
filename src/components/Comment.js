import React from 'react';
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { formatDistanceToNow } from "date-fns";

function Comment({ comment }) {
  const formattedDate = formatDistanceToNow(new Date(comment.created_at))
  
  return (
    <Card sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
        <Typography variant="h6">{comment.user}</Typography>
        <Typography variant="body2" color="text.secondary">{formattedDate} ago</Typography>
      </Box>
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
