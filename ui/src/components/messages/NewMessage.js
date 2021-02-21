import React, { Fragment, useState, useContext } from 'react';
import ProductContext from '../../context/product/productContext';

import M from 'materialize-css/dist/js/materialize.min.js';

const NewMessage = props => {
  const productContext = useContext(ProductContext);

  const { product, submitMessage } = productContext;

  const [message, setMessage] = useState('');

  const onChange = e => {
    setMessage(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (message === '') {
      M.toast({ html: 'Message cannot be empty.' });
    } else {
      console.log('Message Submit');
      submitMessage({
        product: product._id,
        content: message
      });
      props.history.push(`/product/${props.match.params.id}`);
    }
  };

  return (
    <Fragment>
      <h1>New Message for {product && product.name}</h1>
      <h4>Enter the product update below.</h4>
      <br />
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='message'>
            Message
          </label>
          <textarea
            name='message'
            value={message}
            onChange={onChange}
            className='materialize-textarea'
          />
        </div>
        <input type='submit' value='Submit' className='btn' />
      </form>
    </Fragment>
  );
};

export default NewMessage;
