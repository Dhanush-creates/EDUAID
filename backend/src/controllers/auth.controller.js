/**
 * EduAI — Auth Controller  (Stage 2 scaffold)
 */

// const User    = require('../models/User.model');
// const bcrypt  = require('bcryptjs');
// const jwt     = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    res.status(501).json({ message: 'Stage 2 — registration coming soon' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    res.status(501).json({ message: 'Stage 2 — login coming soon' });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(501).json({ message: 'Stage 2 — getMe coming soon' });
  } catch (err) {
    next(err);
  }
};
