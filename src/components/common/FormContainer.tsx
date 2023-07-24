import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children } : {children: React.ReactNode }) => {
  return (
    <Container className='my-2'>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={8} className='card p-5'>
          {children}
        </Col>
      </Row>
    </Container>
  )
};

export default FormContainer