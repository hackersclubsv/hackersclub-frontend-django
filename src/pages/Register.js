import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';

// define validation schema
const schema = yup.object().shape({
  username: yup.string().required().max(10, 'Username must be at most 10 characters'),
  email: yup.string().required().email().matches(/@northeastern\.edu$/, 'Email must be a valid northeastern.edu email'),
  password: yup.string().required().min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one upper case, one lower case, one digit, and one special char'
    ),
  bio: yup.string().required().max(150, 'Bio must be at most 150 characters'),
  });

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Form validation can go here
    const user = { username, password, email, bio, avatar };
    try {
      await schema.validate(user);
      axios.post('http://localhost:4000/users/register', { username, password, email })
      .then(response => {
        console.log(response.data);
        // You can perform actions based on the response here, such as updating the UI to show success, storing the token, etc.
      })
      .catch(error => {
        console.error(error);
        // Handle error here, such as showing an error message to the user
      });
  } catch (err) {
    console.error(err);
  }
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size < 5000000) { // 5MB
    setAvatar(file);
    } else {
      console.error('File too big');
      // Handle error here, such as showing an error message to the user 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />
      <input
        accept="image/*"
        type="file"
        onChange={handleFileChange}
        required
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;

