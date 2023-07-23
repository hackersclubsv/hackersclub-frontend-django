import { PostItem } from '../../types/types';
import { Card } from 'react-bootstrap';

const PostCard = (props: PostItem) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title as="div">
          <a href={`/postdetail/${props.id}`}>
            <strong>{props.title}</strong>
          </a>
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        Creator: {props.creator} | Created: {props.created} | Last Updated:{' '}
        {props.updated} | Category: {props.category}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
