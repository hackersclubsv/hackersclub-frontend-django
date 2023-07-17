import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';


type loginProps = {
  isLogin: Boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ isLogin, setIsLogin }: loginProps) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setEmail('');
      setPassword('');
      setIsLogin(true);
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestLogin = () => {
    login({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com'
    });    
  };
  console.log(isLogin, " in login ts");


  return (
    <div className="container">
      <div className='mb-3'>
        <button className='btn btn-primary' onClick={handleGuestLogin}>Guest Login</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        <div className="contianer">
          <span>
            Not on SV Hackers Club yet? <br />
            <a href="/register">Sign up!</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
