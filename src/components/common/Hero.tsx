import { Container, Row, Col } from "react-bootstrap"
import { welcomeimage } from "../../static_data/welcome"
import { welcomemessage } from "../../static_data/welcome"

import { useSelector } from "react-redux"

const Hero = () => {
  const { userInfo } = useSelector((state : any) => state.auth);

  return (
    <Container className='my-5'>
      <h1>Welcome to Silicon Valley Hackers Club!</h1>
      {userInfo && (
        <Container>
        <Row className='justify-content-md-center mt-5'>
          <h2>Latest Posts</h2>
          <Col xs={12} md={12} className='card py-2 my-2'>
            <p>Post 1</p>
            <p>Post 2</p>
            <p>Post 3</p>
          </Col>
        </Row>
      </Container>
      )}
      <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={6} md={4} className='card p-5 my-2'>
          <img src={welcomeimage} alt="welcome" className="img-fluid" />
        </Col>
        <Col xs={6} md={8} className='card p-5 my-2'>
          {welcomemessage.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </Col>
      </Row>
      </Container>
      
    </Container>
  )
}

export default Hero