import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = message => {
  return <div>This is a message</div>;
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;
