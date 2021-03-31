const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Product = require('../models/Product');
const Message = require('../models/Message');

// @route   GET api/products
// @desc    Get user's products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let products = [];

    if (req.user.role === 'customer') {
      console.log('Get Products Route - Customer Branch');

      const user = await User.findById(req.user.id);
      const test = user.products;

      const testProducts = await Product.find(
        {
          _id: { $in: test }
        },
        function (err, docs) {}
      );

      products = testProducts;
    } else if (req.user.role === 'seller') {
      console.log('Get Products Route - Seller Branch');
      products = await Product.find({ seller: req.user.id });
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get product
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/products/:id/messages
// @desc    Get product messages
// @access  Private
router.get('/:id/messages', auth, async (req, res) => {
  try {
    let messages = await Message.find({ product: req.params.id }).sort({
      date: -1
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/products/:id/messages
// @desc    Add new product message
// @access  Private
router.post(
  '/:id/messages',
  [auth, check('message', 'Message is required.')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.user.role === 'customer') {
      res
        .status(401)
        .json({ msg: 'Customer is not authorized to create messages' });
    }

    const { product, content } = req.body;

    try {
      const newMessage = new Message({
        product,
        content
      });

      const message = await newMessage.save();

      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required.').not().isEmpty(),
    check('description', 'Description is required.').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const code = Math.random().toString(36).substring(6).toLowerCase();

      const newProduct = new Product({
        name,
        description,
        code,
        seller: req.user.id
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/products
// @desc    Update product
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update product');
});

// @route   DELETE api/products
// @desc    Delete product
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete product');
});

// @route   POST api/products/code
// @desc    Submit product code
// @access  Private
router.post(
  '/code',
  [auth, check('code', 'Code is required.')],
  async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findById(req.user.id);
      const product = await Product.findOne({
        code: req.body.code.toLowerCase()
      });

      if (!user.products.includes(product)) {
        console.log('Add Product');
        user.products.push(product);
        user.save();
      }

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
