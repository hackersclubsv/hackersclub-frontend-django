import FormContainer from '../components/common/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/layout/Loader';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const res = await login({ email, password }).unwrap();
      // console.log(res);
      // dispatch(setCredentials({ ...res }));
      // navigate('/');
      // toast.success('Logged in successfully');
    } catch (err: any) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <FormContainer>
      <h1>Password reset</h1>

      <Form onSubmit={submitHandler}>
        <p>Having trouble signing in?</p>
        <p>
          Enter the email address associated with your account, and we’ll email
          you a link to reset your password.
        </p>
        <p><em className='text-red'>*</em> is required.</p>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address<em className='text-red'>*</em></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Continue
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Back to sign in? <Link to="/login">Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ForgetPassword;
