import React, { useState } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

const Register = () => {
  // const alertContext = useContext(AlertContext);

  // const { setAlert } = alertContext;
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
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      console.log('Register Success');
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
            Password
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
