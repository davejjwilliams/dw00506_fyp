import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('Login Success');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='email'>
            Email
          </label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Submit' className='btn' />
      </form>
    </div>
  );
};

export default Login;
