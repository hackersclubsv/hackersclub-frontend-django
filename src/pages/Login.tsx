import React, { useState } from 'react';

type loginProps = {
  isLogin: Boolean, 
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({isLogin, setIsLogin} : loginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='container'>
      <form onSubmit={e => {e.preventDefault(); setIsLogin(true)}}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
