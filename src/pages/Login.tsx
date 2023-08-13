import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/common/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/layout/Loader';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userInfo = {access_token: '', refresh_token: '', username: '', profile_pic: ''};

    console.log("start getting token");
    axios.post('http://localhost:8000/api/token/', {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      userInfo.access_token = response.data.access;
      userInfo.refresh_token = response.data.refresh;
      return axios.get('http://localhost:8000/api/users/', {
         headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
        },})
    }, (error) => {
      console.log(error.response.data);
      const errorResponse = error.response.data;
      errorResponse.email && toast.error(errorResponse.email[0]);
      errorResponse.password && toast.error(errorResponse.password[0]);
      errorResponse.non_field_errors && toast.error(errorResponse.non_field_errors[0]);
      errorResponse.detail && toast.error(errorResponse.detail);
    })
    .then((response) => {
      const profile = response?.data[0];
      userInfo.username = profile.username;
      userInfo.profile_pic = profile.profile_picture;
      navigate('/');
      toast.success('Logged in successfully');
      dispatch(setCredentials({...userInfo}));
    });

    //dispatch(setCredentials({ ...userInfo }));
    
    // try {
    //   const res = await login({ email, password }).unwrap();
    //   console.log(res);
    //   dispatch(setCredentials({ ...res }));
    //   navigate('/');
    //   toast.success('Logged in successfully');
    // } catch (err: any) {
    //   console.log(err);
    //   err && toast.error(err);
    // }
    
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <p>
        <em className="text-red">*</em> is required.
      </p>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address<em className="text-red">*</em></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password<em className="text-red">*</em></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Don't have an account ? <Link to="/register">Register</Link>
        </Col>
      </Row>
      <Row className="py-0">
        <Link to={`/forgetpassword`}>Forgot your password?</Link>
      </Row>
    </FormContainer>
  );
};

export default Login;
