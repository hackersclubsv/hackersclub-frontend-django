import React from 'react';
import { PostDetails } from '../types/types';

const PostDetailPage = (props : {postDetail: PostDetails}) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{props.postDetail.title}</h2>
          <p className="card-subtitle mb-2 text-body-secondary">
            {props.postDetail.creator} | {props.postDetail.created}
          </p>
          <p className="card-text">{props.postDetail.content}</p>
        </div>
      </div>
        <ul className="list-group">
          <h3 className="list-group-item">Comments</h3>
          {props.postDetail.comments.map((comment, id) => (
            <li className="list-group-item" key={id}>
              <p>{comment.creator} | {comment.created}</p>
              <p>{comment.content}</p>
              </li>
          ))}
        </ul>
    </div>
  );
};

export default PostDetailPage;
