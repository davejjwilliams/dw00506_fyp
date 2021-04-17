import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const MessageItem = ({ message }) => {
  const { content, sig_number, signature, signer, date } = message;
  const [verification, setVerification] = useState({
    verified: '',
    fetchedSignature: ''
  });
  const { verified, fetchedSignature } = verification;

  const jsDate = new Date(date);
  const dateString = jsDate.toDateString() + ' - ' + jsDate.toTimeString();

  const clearVerification = () => {
    setVerification({
      verified: '',
      fetchedSignature: ''
    });
  };

  const verify = async () => {
    const res = await axios.get(`/api/products/signatures/${sig_number}`);
    setVerification({
      verified: res.data.isValid,
      fetchedSignature: res.data.signature
    });
  };

  return (
    <li>
      <div className='collapsible-header' onClick={clearVerification}>
        <div>
          <h5>{content}</h5>
          <p>
            Posted by: {signer.name} ({signer.email})<br />
            Date: {dateString}
          </p>
          <Link to='#!'>Signature</Link>
        </div>
      </div>
      <div className='collapsible-body'>
        <p style={{ overflowWrap: 'break-word' }}>
          Public Key: {signer.public_key}
        </p>
        <button onClick={verify} className='btn'>
          Verify Signature
        </button>
        {verified && <p>Signature Verified</p>}
        {fetchedSignature !== '' && (
          <p style={{ overflowWrap: 'break-word' }}>
            Signature: {fetchedSignature}
          </p>
        )}
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
