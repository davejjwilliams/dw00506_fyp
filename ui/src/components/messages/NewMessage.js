import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
import { KEYUTIL, KJUR } from 'jsrsasign';

import M from 'materialize-css/dist/js/materialize.min.js';

const NewMessage = props => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const productContext = useContext(ProductContext);
  const { product, submitMessage, getProduct } = productContext;

  useEffect(() => {
    loadUser();
    getProduct(props.match.params.id);
  }, []);

  const [messageFields, setMessageFields] = useState({
    content: '',
    privKey: ''
  });

  const [signature, setSignature] = useState('');

  const { content, privKey } = messageFields;

  const signMessage = () => {
    console.log('Signing');
    try {
      var priv = KEYUTIL.getKey(privKey);
      var sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' });

      sig.init(priv);
      sig.updateString(content);

      var sigHex = sig.sign();
      setSignature(sigHex);
    } catch (err) {
      M.toast({
        html:
          'Something went wrong while signing. Please check each field again.'
      });
    }
  };

  const onChange = e => {
    setMessageFields({ ...messageFields, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (content === '') {
      M.toast({ html: 'Message cannot be empty.' });
    } else {
      // console.log('Message Submit');
      // console.log('Signature', signature);
      // console.log('Product ID', product._id);
      // console.log('Content', content);
      // console.log('Public Key', user.public_key);
      submitMessage({
        product_id: product._id,
        content,
        public_key: user.public_key.replace(new RegExp('\r\n', 'g'), ''),
        signature
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
          <label className='active' htmlFor='content'>
            Message
          </label>
          <textarea
            name='content'
            value={content}
            onChange={onChange}
            className='materialize-textarea'
          />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='privKey'>
            Private Key PEM
          </label>
          <textarea
            name='privKey'
            value={privKey}
            onChange={onChange}
            className='materialize-textarea'
          />
        </div>
        <h4>Signature</h4>
        {signature}
        <br />
        <a href='#!' className='btn' onClick={signMessage}>
          Sign the message!
        </a>
        <br />
        <br />
        <input type='submit' value='Submit' className='btn' />
      </form>
    </Fragment>
  );
};

export default NewMessage;
