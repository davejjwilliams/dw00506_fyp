import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
import { KEYUTIL, KJUR } from 'jsrsasign';

import M from 'materialize-css/dist/js/materialize.min.js';

const NewMessage = props => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const productContext = useContext(ProductContext);
  const {
    product,
    formSuccess,
    error,
    submitMessage,
    getProduct,
    resetFormSuccess,
    clearProductErrors
  } = productContext;

  useEffect(() => {
    loadUser();
    getProduct(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (formSuccess) {
      resetFormSuccess();
      props.history.push(`/product/${props.match.params.id}`);
    }

    if (error === 'Customer is not authorized to create messages') {
      M.toast({ html: 'You cannot create a message as a customer.' });
      clearProductErrors();
    }
    if (error === 'User is not authorised to create product messages.') {
      M.toast({
        html: 'You are not authorised to create updates for this product.'
      });
      clearProductErrors();
    }
    if (error === 'Signature is not valid.') {
      M.toast({ html: 'The signature is not valid.' });
      clearProductErrors();
    }
    // eslint-disable-next-line
  }, [formSuccess, error]);

  const [messageFields, setMessageFields] = useState({
    content: '',
    privKey: ''
  });

  const [signature, setSignature] = useState('');
  const [signedMessage, setSignedMessage] = useState('');

  const { content, privKey } = messageFields;

  const signMessage = () => {
    try {
      var today = new Date();
      today =
        today.getUTCDate() +
        '/' +
        (today.getUTCMonth() + 1) +
        '/' +
        today.getUTCFullYear();

      var priv = KEYUTIL.getKey(privKey);
      var sig = new KJUR.crypto.Signature({ alg: 'SHA512withECDSA' });
      sig.init(priv);

      // append today's date in the form dd/mm/yyyy
      var toSign = today + '-' + content;
      sig.updateString(toSign);

      var sigHex = sig.sign();
      setSignature(sigHex);
      setSignedMessage(toSign);
    } catch (err) {
      M.toast({
        html: 'Something went wrong while signing. Please check each field again.'
      });
    }
  };

  const onChange = e => {
    setMessageFields({ ...messageFields, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (content === '' || privKey === '' || signature === '') {
      M.toast({ html: 'Please fill in all fields and sign your message.' });
    } else {
      // props.history.push(`/product/${props.match.params.id}`);
      submitMessage({
        product_id: product._id,
        content,
        public_key: user.public_key.replace(new RegExp('\r\n', 'g'), ''),
        signature
      });
    }
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  return (
    <Fragment>
      <br />
      <Link
        to={`/product/${props.match.params.id}`}
        className='btn btn-small blue darken-4'
      >
        <i className='material-icons'>arrow_back</i>
      </Link>
      <h2>New Update for {product && product.name}</h2>
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
        <a href='#!' className='btn blue darken-4' onClick={signMessage}>
          Sign Message
        </a>
        {signature !== '' && (
          <Fragment>
            <br />
            <br />
            <p style={{ overflowWrap: 'break-word' }}>
              Signed Content: "{signedMessage}"
            </p>
            <p style={{ overflowWrap: 'break-word' }}>Signature: {signature}</p>
            <input
              type='submit'
              value='Submit'
              className='btn btn-large green'
            />
          </Fragment>
        )}
      </form>
    </Fragment>
  );
};

export default NewMessage;
