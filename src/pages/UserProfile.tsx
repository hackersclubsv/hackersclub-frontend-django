import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/common/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/layout/Loader';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateUser, {isLoading}] = useUpdateUserMutation();

  useEffect(() => {
      setUsername(userInfo.username);
      setBio(userInfo.bio);
  }, [userInfo.setUsername, userInfo.setBio]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateUser({
          username,
          password,
          bio,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        navigate('/');
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={userInfo.email}
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="created">
          <Form.Label>Created</Form.Label>
          <Form.Control
            type="text"
            value={userInfo.created}
            disabled
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className="my-2" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="textarea"
            value={userInfo.bio}
            onChange={(e) => setBio(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className="my-2" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            value={userInfo.role}
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserProfile;
