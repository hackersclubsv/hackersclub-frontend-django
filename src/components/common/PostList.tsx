import React from 'react';
import PostCard from './PostCard';
import { exampleposts } from '../../dummy/exampleposts';
import { PostDetails } from '../../types/types';


const PostList = (props:{postlist : PostDetails[]}) => {
  return (
    <div className="container">
      {props.postlist.map(
        (post) => (
          <PostCard
            key={post.id}
            {...post}
            />
        )
      )}
    </div>
  );
};

export default PostList;
