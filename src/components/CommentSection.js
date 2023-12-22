import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import MarkdownEditor from "./Editor.js";
import axios from "../api/axios.js";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

function Comment({ comment, onReplyClick }) {
  const formattedDate = formatDistanceToNow(new Date(comment.created));

  return (
    <Card sx={{ mt: 2, bgcolor: "#F3F8FF", borderRadius: "1em" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => onReplyClick(comment._id)}
          >
            Reply
          </Button>
          <Typography
            variant="h6"
            component="span"
            sx={{
              ml: 1,
              color: "primary.main",
            }}
          >
            {comment.userId.username}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formattedDate} ago
        </Typography>
      </Box>
      <CardContent sx={{ paddingTop: 0 }}>
        <ReactMarkdown
          children={comment.text}
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
            img({ node, ...props }) {
              return <img {...props} alt="" style={{ maxWidth: "100%" }} />;
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

function handleNestedComments(comments) {
  const commentMap = new Map(
    comments.map((comment) => [comment._id, { ...comment, replies: [] }]),
  );
  const rootComments = [];
  comments.forEach((comment) => {
    if (comment.parentId === null) {
      rootComments.push(commentMap.get(comment._id));
    } else {
      commentMap
        .get(comment.parentId)
        .replies.push(commentMap.get(comment._id));
    }
  });
  return rootComments;
}

function CommentSection({ comments, postId, onCommentSubmitted }) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [editorValue, setEditorValue] = useState("");

  const handleReplyClick = (commentId) => {
    setEditorOpen(true);
    setReplyTo(commentId);
    setEditorValue("");
  };

  const handleNewCommentClick = () => {
    setEditorOpen(true);
    setReplyTo(null);
    setEditorValue("");
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      parentId: replyTo,
      text: editorValue,
      postId: postId,
    };
    try {
      // if user is not logged in, redirect to login page

      // const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(`/comments`, newComment, { withCredentials: true});
      if (response.status === 200 || response.status === 201) {
        // refresh comments
        setEditorOpen(false);
        onCommentSubmitted();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const nestedComments = handleNestedComments(comments);

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment, index) => (
      <div key={index}>
        <Box ml={depth * 4}>
          <Comment comment={comment} onReplyClick={handleReplyClick} />
          {editorOpen && replyTo === comment._id && (
            <>
              <MarkdownEditor value={editorValue} onChange={setEditorValue} />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleNewCommentSubmit}
                  sx={{ mx: 2, my: 2 }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setEditorOpen(false)}
                  sx={{ mx: 2, my: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
        {comment.replies &&
          comment.replies.length > 0 &&
          renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewCommentClick}
        >
          + Comment
        </Button>
      </Box>
      {editorOpen && replyTo === null && (
        <>
          <MarkdownEditor value={editorValue} onChange={setEditorValue} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="success"
              onClick={handleNewCommentSubmit}
              sx={{ mx: 2, my: 2 }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditorOpen(false)}
              sx={{ mx: 2, my: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
      <List>{nestedComments && renderComments(nestedComments)}</List>
    </Box>
  );
}

export default CommentSection;
