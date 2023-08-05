import React from "react";
import PostCard from "./PostCard";
import { PostDetails } from "../../types/types";
import { Container } from "react-bootstrap";

const PostList = (props: { postlist: PostDetails[] }) => {
  return (
    // <Container className="my-5">
    //   {props.postlist.map((post) => (
    //     <PostCard key={post.id} {...post} />
    //   ))}
    // </Container>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Lastest/Porpular</th>
          <th scope="col">Author</th>
          <th scope="col">Comments & Likes</th>
          <th scope="col">Time</th>
        </tr>
      </thead>

      <tbody>
        {props.postlist.map((post, index) => (
          <tr key={index}>
            <th scope="row" style={{ fontWeight: "normal" }}>
              {post.title}
            </th>
            <td>{post.creator}</td>
            <td>
              <i className="bi bi-chat-left" style={{ margin: "5px" }}></i>
              {post.comments.length}
              <i
                className="bi bi-hand-thumbs-up"
                style={{ marginRight: "5px", marginLeft: "15px" }}
              ></i>
              {post.comments.length}
            </td>
            <td>{post.created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
