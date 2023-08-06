import React from "react";
import { PostDetails } from "../../types/types";

const PostList = (props: { postlist: PostDetails[] }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Lastest/Porpular</th>
          <th scope="col">Author</th>
          <th scope="col">Comments</th>
          <th scope="col">Last Updated</th>
          <th scope="col">Created</th>
        </tr>
      </thead>

      <tbody>
        {props.postlist.map((post, index) => (
          <tr key={index}>
            <th scope="row" style={{ fontWeight: "normal" }}>
              <a href="/postdetail">{post.title}</a>
            </th>
            <td>
              <a href="/profile">{post.creator}</a>
              </td>
            <td>
              <i className="bi bi-chat-left" style={{ margin: "5px" }}></i>
              {post.comments.length}
            </td>
            <td>{post.updated}</td>
            <td>{post.created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
