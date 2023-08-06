import React from 'react';
import { PostDetails } from '../types/types';
import { exampleposts } from '../static_data/exampleposts';

import { Container, Card, ListGroup } from 'react-bootstrap';

const PostDetailPage = () => {
  return (
    <Container className="my-5">
      <h3 className="my-5">Post Detail</h3>
      <Card>
        <Card.Body>
          <Card.Title>{exampleposts[0].title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {exampleposts[0].creator} | Created: {exampleposts[0].created} | Last Updated: {exampleposts[0].updated}
          </Card.Subtitle>
          <Card.Text>{exampleposts[0].content}</Card.Text>
        </Card.Body>
        </Card>

        <h3 className="my-5">Comments</h3>
        <ListGroup variant="flush" className='my-5'>
          {exampleposts[0].comments.map((comment, id) => (
            <ListGroup.Item key={id}>
              <p>{comment.creator} | {comment.created}</p>
              <p>{comment.content}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>


    </Container>
    // <div className="container">
    //   Post Detail Page
    //   <div className="card">
    //     <div className="card-body">
    //       <h2 className="card-title">{props.postDetail.title}</h2>
    //       <p className="card-subtitle mb-2 text-body-secondary">
    //         {props.postDetail.creator} | {props.postDetail.created}
    //       </p>
    //       <p className="card-text">{props.postDetail.content}</p>
    //     </div>
    //   </div>
    //     <ul className="list-group">
    //       <h3 className="list-group-item">Comments</h3>
    //       {props.postDetail.comments.map((comment, id) => (
    //         <li className="list-group-item" key={id}>
    //           <p>{comment.creator} | {comment.created}</p>
    //           <p>{comment.content}</p>
    //           </li>
    //       ))}
    //     </ul>
    // </div>
  );
};

export default PostDetailPage;
