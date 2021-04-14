import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import MessageItem from './MessageItem';

const Messages = ({ messages }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <ul className='collapsible'>
      {messages.map(message => (
        <MessageItem message={message} key={message._id} />
      ))}
    </ul>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Messages;
