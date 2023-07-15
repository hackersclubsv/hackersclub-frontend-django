import React from 'react';
import { PostDetails } from '../types/types';

const PostDetailPanel = (postDetail: PostDetails) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{postDetail.title}</h2>
          <p className="card-subtitle mb-2 text-body-secondary">
            {postDetail.creator} | {postDetail.creator}
          </p>
          <p className="card-text">{postDetail.content}</p>
        </div>
        <h3>Comments</h3>
        <ul className="list-group">
          {postDetail.comments.map((comment) => (
            <li className="list-group-item">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPanel;
