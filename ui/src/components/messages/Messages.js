import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MessageItem from './MessageItem';

const Messages = ({ messages }) => {
  return (
    <Fragment>
      {messages.map(message => (
        <MessageItem message={message} key={message._id} />
      ))}
    </Fragment>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default Messages;
