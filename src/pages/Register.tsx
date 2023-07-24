import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/common/FormContainer';
import Loader from '../components/layout/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ username, email, password, bio }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast.success('Registered successfully');
      } catch (err: any) {
        err.data.username && toast.error(err.data.username[0]);
        err.data.email && toast.error(err.data.email[0]);
        err.data.password && toast.error(err.data.password[0]);
        err.data.bio && toast.error(err.data.bio[0]);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Name<em> *required</em></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUserame(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address<em> *required</em></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="role">
          <Form.Label>Role<em> *required</em></Form.Label>
          <Form.Control
            type="text"
            value="Student"
            readOnly
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password<em> *required</em></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password<em> *required</em></Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
