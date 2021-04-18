const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');

// Signature Validation
const { KEYUTIL, KJUR } = require('jsrsasign');
// Blockchain Interaction
const web3 = require('web3');
const abi = require('../signatures/build/contracts/MessageSignatures.json');

const User = require('../models/User');
const Product = require('../models/Product');
const Message = require('../models/Message');

// @route   GET api/products
// @desc    Get user's products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let products = [];
    const user = await User.findById(req.user.id);

    if (user.role === 'customer') {
      console.log('Get Products Route - Customer Branch');
      const test = user.products;

      const testProducts = await Product.find({
        _id: { $in: test }
      });

      products = testProducts;
    } else if (user.role === 'seller') {
      console.log('Get Products Route - Seller Branch');
      products = await Product.find({ seller: req.user.id });
    } else if (user.role === 'manufacturer') {
      console.log('Get Products Route - Manufacturer Branch');
      products = await Product.find({
        $or: [{ manufacturers: { $elemMatch: { email: user.email } } }]
      });
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

// @route   POST api/products/messages
// @desc    Add new product message
// @access  Private
router.post(
  '/messages',
  [
    auth,
    check('product_id', 'Product is required.').not().isEmpty(),
    check('content', 'Message is required.').not().isEmpty(),
    check('public_key', 'Public key is required.').not().isEmpty(),
    check('signature', 'Signature is required.').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product_id, content, public_key, signature } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.role === 'customer') {
        res
          .status(401)
          .json({ msg: 'Customer is not authorized to create messages' });
      }

      const product = await Product.findById(product_id);

      // check if public key has been whitelisted
      var index = product.manufacturers.findIndex(
        // replace to remove graphical display symbols
        m => m.public_key.replace(new RegExp('\r\n', 'g'), '') === public_key
      );

      // key was not whitelisted and the signer isn't the product seller
      if (index === -1 && !product.seller.toString().includes(user._id)) {
        return res
          .status(401)
          .json({ msg: 'User is not authorised to create product messages.' });
      }

      let signer = {};

      // signer is product seller
      if (index === -1) {
        signer = {
          _id: user._id,
          name: user.name,
          email: user.email,
          public_key: user.public_key
        };
      } else {
        signer = product.manufacturers[index];
      }

      // signature verification
      var pub = KEYUTIL.getKey(public_key);
      var sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' });
      sig.init(pub);
      sig.updateString(content);
      var isValid = sig.verify(signature); // signature validity

      if (!isValid) {
        return res.status(400).json({ msg: 'Signature is not valid.' });
      }

      var web3js = new web3(
        new web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
      );

      var contractAddress = config.get('contractAddress');
      const messageSignatures = new web3js.eth.Contract(
        abi.abi,
        contractAddress
      );

      const accounts = await web3js.eth.getAccounts();
      await messageSignatures.methods
        .createSignature(signature)
        .send({ from: accounts[0], gas: 3000000 });

      // To be added to Message Object
      const sigCount = await messageSignatures.methods.sigCount().call();

      const newMessage = new Message({
        product: product_id,
        content,
        sig_number: sigCount,
        signature,
        signer
      });

      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/products/signatures/:id
// @desc    Verify message signature
// @access  Private
router.get('/signatures/:id', auth, async (req, res) => {
  try {
    const message = await Message.findOne({ sig_number: req.params.id });

    var web3js = new web3(
      new web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
    );

    var contractAddress = config.get('contractAddress');
    const messageSignatures = new web3js.eth.Contract(abi.abi, contractAddress);

    const latestSignature = await messageSignatures.methods
      .signatures(req.params.id)
      .call();

    const signature = latestSignature.content;
    const pk = message.signer.public_key.replace(new RegExp('\r\n', 'g'), '');

    // signature verification
    var pub = KEYUTIL.getKey(pk);
    var sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' });
    sig.init(pub);
    sig.updateString(message.content);
    var isValid = sig.verify(signature); // signature validity

    res.json({ signature, isValid });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
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
    check('description', 'Description is required.').not().isEmpty(),
    check('image_url', 'Image URL is required.').not().isEmpty(),
    check(
      'manufacturer_emails',
      'Manufacturer emails must be included.'
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, image_url, manufacturer_emails } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.role !== 'seller') {
        return res
          .status(401)
          .json({ msg: 'Product creator must be a seller.' });
      }

      const code = Math.random().toString(36).substring(6).toLowerCase();

      var split_emails = manufacturer_emails.split(',');

      var foundManufacturers = await User.find({
        email: { $in: split_emails }
      }).select('name email public_key');

      const newProduct = new Product({
        name,
        description,
        image_url,
        code,
        manufacturers: foundManufacturers,
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
      const user = await User.findById(req.user.id);

      if (user.role !== 'customer') {
        return res
          .status(401)
          .json({ msg: 'Only customers can follow products.' });
      }

      const product = await Product.findOne({
        code: req.body.code.toLowerCase()
      });

      if (!product) return res.status(404).json({ msg: 'Product not found' });

      if (user.products.includes(product._id)) {
        return res.status(400).json({ msg: 'Product already followed.' });
      }

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
