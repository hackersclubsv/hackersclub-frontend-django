import React from 'react';
import PostCard from './PostCard';
import { PostDetails } from '../../types/types';
import { Container } from 'react-bootstrap';

const PostList = (props: { postlist: PostDetails[] }) => {
  return (
    <Container className='my-5'>
      {props.postlist.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </Container>
  );
};

export default PostList;
