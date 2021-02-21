import React, { Fragment, useState, useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const Code = props => {
  const productContext = useContext(ProductContext);

  const { submitCode } = productContext;

  const [code, setCode] = useState('');

  const onChange = e => {
    setCode(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('Code Submit');
    submitCode(code);
    props.history.push('/');
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
