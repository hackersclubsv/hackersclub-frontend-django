import axios from 'axios'
import { useEffect, useState } from 'react';
import { Container, Image, Col, Row, Card } from 'react-bootstrap';

const Profile = () => {
  const userInfo = localStorage.getItem('userInfo');
  const access = userInfo ? JSON.parse(userInfo).access : null;

  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    profile_pic: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((response) => {
      const profile = response?.data[0];
      setProfile({
        username: profile.username,
        email: profile.email,
        bio: profile.bio,
        profile_pic: profile.profile_picture,
      });
    }, (error) => {
      console.log(error.response.data);
    });
  }, [access]);

  const handleEdit = () => {
    console.log('edit');
  }
  
  
  return (
    <Container className='my-5'>
      <h1>Profile</h1>
      <Row className='gutters-sm'>
        <Col md={4} className='mb-3'>
          <Card>
            <Card.Body>
              <div className='d-flex flex-column align-items-center text-center'>
                <Image src={profile.profile_pic} width={200} height={200} roundedCircle />
                <div className='mt-3'>
                  <h4>{profile.username} <i className="bi bi-pencil-fill" onClick={handleEdit}></i></h4>
                  <p className='text-secondary mb-1'>{profile.email}</p>
                  <p className='text-muted font-size-sm'>{profile.bio}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Email</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {profile.email}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Bio</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {profile.bio}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className='mb-3'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                <h6 className='mb-0'>Posts</h6>
                <span className='text-secondary'>0</span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                <h6 className='mb-0'>Comments</h6>
                <span className='text-secondary'>0</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default Profile