const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Product = require('../models/Product');

// @route   GET api/products
// @desc    Get user's products
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all products');
});

// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post('/', (req, res) => {
  res.send('Add product');
});

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

module.exports = router;
