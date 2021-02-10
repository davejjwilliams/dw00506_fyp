import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import M from 'materialize-css/dist/js/materialize.min.js';

const Login = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, error, login, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      M.toast({ html: 'Incorrect Login Details' });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

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
    if (email === '' || password === '') {
      M.toast({ html: 'Please enter all fields.' });
    } else {
      login({ email, password });
    }
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
      <p>
        Don't have an account? <Link to='/register'>Register Here</Link>
      </p>
    </div>
  );
};

export default Login;
