import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format, parseISO } from "date-fns";

const PostDetail = ({ post }) => {
  const formattedDate = format(parseISO(post.created_at), "Ppp");
  return (
    <Card sx={{ paddingBottom: "2em", marginBottom: "2em"}}> 
      <CardHeader
        title={post.title}
        subheader={`Author: ${post.author}, Created: ${formattedDate}`}
      />
      <CardContent>
        {/* space-between: main axis (horizontal) the first item is at the start, the last item is at the end, the remaining items are distributed evenly in between. */}
        {/* center: aligns items along the vertical axis, in the middle */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" color="text.secondary">
              Category: {post.category_display}
            </Typography>
          </Grid>
          <Grid item>
            {post.tags && post.tags.length > 0 && (
              <Box display="flex" flexWrap="wrap">
                {post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    color="primary"
                    variant="outlined"
                    sx={{ margin: "0.5em" }}
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Typography variant="body1" color="text.primary"></Typography>
        <ReactMarkdown
          children={post.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={solarizedlight}
                  language={match[1]}
                  PreTag="div"
                >
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PostDetail;
