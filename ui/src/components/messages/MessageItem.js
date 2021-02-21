import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MessageItem = ({ message }) => {
  const { content } = message;
  return (
    <div className='card'>
      <h5>{content}</h5>
      <p>Signer: {`name`}</p>
      <Link to='#!'>Signature</Link>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
