const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect Mongo
const url = 'mongodb://127.0.0.1:27017/dw00506_fyp';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log(`Database connected at ${url}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
