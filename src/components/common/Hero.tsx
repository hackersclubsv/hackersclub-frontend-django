import { Container, Row, Col } from 'react-bootstrap';
import { welcomeimage } from '../../assets/page_contents/welcome';
import { welcomemessage } from '../../assets/page_contents/welcome';

import { useSelector } from 'react-redux';
import PostList from './PostList';
import { exampleposts } from '../../static_data/exampleposts';

const Hero = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <Container className="my-5">
      <Container>
        <Row className="justify-content-md-center mt-5">
          <h2 className='my-2'>Latest Posts</h2>
          <PostList postlist={exampleposts} />
        </Row>
      </Container>
      <Container>
        <h2 className='my-5'>Welcome to Silicon Valley Hackers Club!</h2>
        <Row className="justify-content-md-center mt-5">
          <Col xs={6} md={4} className="card p-5 my-2">
            <img src={welcomeimage} alt="welcome" className="img-fluid" />
          </Col>
          <Col xs={6} md={8} className="card p-5 my-2">
            {welcomemessage.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
