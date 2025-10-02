const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// GET /users/me - authenticated profile
router.get('/me', authenticate, async (req, res) => {
  res.json(req.user); // already set in authenticate.js
});

module.exports = router;
