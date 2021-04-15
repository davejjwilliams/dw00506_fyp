import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MessageItem = ({ message }) => {
  const { content, signer, signature, date } = message;

  const jsDate = new Date(date);
  const dateString = jsDate.toDateString() + ' - ' + jsDate.toTimeString();

  return (
    <li>
      <div className='collapsible-header'>
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
        <p style={{ overflowWrap: 'break-word' }}>Signature: {signature}</p>
        <p style={{ overflowWrap: 'break-word' }}>
          Public Key: {signer.public_key}
        </p>
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
