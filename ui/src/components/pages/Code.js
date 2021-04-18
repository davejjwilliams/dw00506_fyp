import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

import M from 'materialize-css/dist/js/materialize.min.js';
import { RESET_FORM_SUCCESS } from '../../context/types';

const Code = props => {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  const productContext = useContext(ProductContext);
  const {
    error,
    formSuccess,
    submitCode,
    clearProductErrors,
    resetFormSuccess
  } = productContext;

  useEffect(() => {
    if (formSuccess) {
      resetFormSuccess();
      props.history.push('/');
    }
    if (error === 'Product already followed.') {
      M.toast({ html: 'You are already following this product.' });
      clearProductErrors();
    }
    if (error === 'Only customers can follow products.') {
      M.toast({ html: 'Only customers can follow products.' });
      clearProductErrors();
    }
    if (error === 'Product not found') {
      M.toast({ html: 'There is no product associated with this code!' });
      clearProductErrors();
    }
  }, [error, formSuccess]);

  const [code, setCode] = useState('');

  const onChange = e => {
    setCode(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (code === '') {
      M.toast({ html: 'Please enter a code!' });
    } else {
      submitCode(code);
      // props.history.push('/');
    }
  };

  return (
    <Fragment>
      <h1>Code</h1>
      <h4>Enter the code you received to receive updates for your products.</h4>
      <br />
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='code'>
            Code
          </label>
          <input type='text' name='code' value={code} onChange={onChange} />
        </div>
        <input type='submit' value='Submit' className='btn' />
      </form>
    </Fragment>
  );
};

export default Code;
