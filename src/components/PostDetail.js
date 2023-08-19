import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Prism from 'prism-react-renderer';

const PostDetail = ({ post }) => {
  return (
    <Card>
      <CardHeader
        title={post.title}
        subheader={`Author: ${post.author}, Created: ${new Date(post.created).toLocaleString()}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Category: {post.category}<br/>
          Tags: {post.tags.join(", ")}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body1" color="text.primary">
          Content:
        </Typography>
        <Prism code={post.content} language="jsx" autoHighlight={true} >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Prism>
      </CardContent>
    </Card>
  );
}

export default PostDetail;
