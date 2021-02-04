import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

import M from 'materialize-css/dist/js/materialize.min.js';

const Register = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, error, register, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      M.toast({ html: 'User with this email already exists.' });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      M.toast({ html: 'Please enter all fields' });
    } else if (!password.match('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}')) {
      M.toast({
        html:
          'Password must be at least 8 characters, containing one uppercase, one lowercase and one number.'
      });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div>
      <h1>Register Account</h1>
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='name'>
            Name
          </label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='email'>
            Email
          </label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='password'>
            Password (at least 8 characters, must contain one uppercase, one
            lower case and one number)
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='password2'>
            Confirm Password
          </label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Submit' className='btn' />
      </form>
    </div>
  );
};

export default Register;
