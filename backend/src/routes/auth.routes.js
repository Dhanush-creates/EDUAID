/**
 * EduAI — Auth Routes  (Stage 2 scaffold)
 *
 * POST /api/v1/auth/register  — create a new account
 * POST /api/v1/auth/login     — login, returns JWT
 * GET  /api/v1/auth/me        — get current user (protected)
 */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');
// const { protect } = require('../middleware/auth.middleware');

router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
// router.get('/me',     protect, ctrl.getMe);   // uncomment in Stage 2

module.exports = router;
