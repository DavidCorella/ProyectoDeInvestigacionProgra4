const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});

const mongoose = require('mongoose');

const users = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const tokens = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  due: {
    type: Date,
    default: Date.now
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});
const { users, tokens } = require('./schemas');

const userModel = mongoose.model('User', authorSchema);
const tokenModel = mongoose.model('token', bookSchema);

module.exports = {
  users,
  tokens
}