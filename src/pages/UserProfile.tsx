import { Container, ListGroup } from "react-bootstrap"

const UserProfile = () => {
  return (
    <Container className='my-5'>
      <h2>User Profile</h2>
      <ListGroup>
        <ListGroup.Item>Username:</ListGroup.Item>
        <ListGroup.Item>Email:</ListGroup.Item>
        <ListGroup.Item>Bio:</ListGroup.Item>
        <ListGroup.Item>Role:</ListGroup.Item>
        <ListGroup.Item>Created:</ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default UserProfile