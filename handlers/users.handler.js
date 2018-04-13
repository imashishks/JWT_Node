const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUser = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'no token provided' });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    User.findById(decoded.id, (err1, user) => {
      if (err1) return res.status(500).send('There was a problem finding the user.');
      if (!user) return res.status(404).send('No user found.');

      return res.status(200).send(user);
    });
  });
};

exports.postUser = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const obj = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  /*  eslint-disable */
  User.create(obj, (err, user) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: 86400 });
    return res.status(200).send({ auth: true, token });
  });
};
