const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  content: {
    type: String,
    required: true
  },
  sig_number: {
    type: Number,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  signer: {
    name: { type: String },
    email: { type: String },
    public_key: { type: String }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('message', MessageSchema);
