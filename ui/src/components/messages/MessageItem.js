import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

const MessageItem = ({ message }) => {
  const { content, sig_number, signer, date } = message;
  const [verification, setVerification] = useState({
    verifiedMessage: '',
    fetchedSignature: '',
    valid: ''
  });
  const { verifiedMessage, fetchedSignature, valid } = verification;

  const jsDate = new Date(date);
  const dateString = jsDate.toDateString() + ' - ' + jsDate.toTimeString();

  const clearVerification = () => {
    setVerification({
      verifiedMessage: '',
      fetchedSignature: '',
      valid: ''
    });
  };

  const verify = async () => {
    try {
      const res = await axios.get(`/api/products/signatures/${sig_number}`);
      setVerification({
        verifiedMessage: res.data.verifiedMessage,
        valid: res.data.isValid,
        fetchedSignature: res.data.signature
      });
    } catch (err) {
      M.toast({ html: 'Error verifying signature!' });
    }
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
          <Link to='#!'>View Signature</Link>
        </div>
      </div>
      <div className='collapsible-body'>
        <button onClick={verify} className='btn green'>
          Verify Signature
        </button>
        <p style={{ overflowWrap: 'break-word' }}>
          Public Key: {signer.public_key}
        </p>
        <p style={{ overflowWrap: 'break-word' }}>
          Algorithm: SHA512 with ECDSA
        </p>

        {verifiedMessage !== '' && (
          <Fragment>
            <div className='divider'></div>
            <p style={{ overflowWrap: 'break-word' }}>
              Verified Message: "{verifiedMessage}"
            </p>
          </Fragment>
        )}

        {fetchedSignature !== '' && (
          <p style={{ overflowWrap: 'break-word' }}>
            Signature: {fetchedSignature}
          </p>
        )}

        {valid && <p>Signature fetched from blockchain and verified!</p>}
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
