import React from 'react';
import { PostItem } from '../../types/types';

const PostCard = (props: PostItem) => {
  return (
    <div className="card">
      <div className="card-body">
        <a href='/postdetail'>
          <h5 className="card-title">{props.title}</h5>
        </a>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.creator}</li>
        <li className="list-group-item">{props.created}</li>
      </ul>
    </div>
  );
};

export default PostCard;
