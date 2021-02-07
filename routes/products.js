const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../models/Product');
const User = require('../models/User');

// @route   GET api/products
// @desc    Get user's products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let products = [];

    if (req.user.role === 'customer') {
      console.log('Get Products Route - Customer Branch');

      // FIGURE THIS OUT - FIND ALL PRODUCTS FROM USER LIST
      const user = await User.findById(req.user.id);
      const test = user.products;

      console.log(test);

      const testProducts = await Product.find(
        {
          _id: { $in: test }
        },
        function (err, docs) {}
      );

      console.log(testProducts);
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
      const code = Math.random().toString(36).substring(6);

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
      console.log(`Found user ${user.name}`);
      const product = await Product.findOne({ code: req.body.code });
      console.log(`Found product ${product.name}`);
      user.products.push(product);

      user.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
