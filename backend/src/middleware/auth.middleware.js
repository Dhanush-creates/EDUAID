/**
 * EduAI — Auth Middleware  (Stage 2 scaffold)
 * JWT protection for private routes.
 */

// const jwt  = require('jsonwebtoken');
// const User = require('../models/User.model');

/*
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorised — no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorised — invalid token' });
  }
};
*/

// Uncomment above when Stage 2 begins
exports.protect = (_req, _res, next) => next();
