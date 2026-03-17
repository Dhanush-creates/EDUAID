/**
 * EduAI — Schemes Controller (Stage 2 scaffold)
 * In Stage 2 these will read from MongoDB.
 * For now they return stub responses.
 */

// Stage 2: import Mongoose model
// const Scheme = require('../models/Scheme.model');

// Stage 2: import eligibility engine (mirrors frontend logic)
// const { scoreAllSchemes } = require('../utils/eligibilityEngine');

exports.listSchemes = async (_req, res, next) => {
  try {
    // Stage 2: const schemes = await Scheme.find().lean();
    res.json({ message: 'Stage 2 — coming soon', data: [] });
  } catch (err) {
    next(err);
  }
};

exports.getScheme = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Stage 2: const scheme = await Scheme.findOne({ id }).lean();
    res.json({ message: `Stage 2 — scheme ${id} coming soon`, data: null });
  } catch (err) {
    next(err);
  }
};

exports.matchSchemes = async (req, res, next) => {
  try {
    const userProfile = req.body;
    // Stage 2:
    //   const schemes = await Scheme.find().lean();
    //   const result  = scoreAllSchemes(schemes, userProfile);
    //   res.json({ data: result });
    res.json({ message: 'Stage 2 — eligibility API coming soon', userProfile, data: null });
  } catch (err) {
    next(err);
  }
};
