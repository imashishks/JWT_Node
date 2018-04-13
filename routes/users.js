const { getUser, postUser } = require('../handlers/users.handler');

const express = require('express');

const router = express.Router();

/* Register user. */
router.route('/')
  .get(getUser)
  .post(postUser);

module.exports = router;
