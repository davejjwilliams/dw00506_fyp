const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  seller_key: {
    type: String,
    required: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messages'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('product', ProductSchema);
