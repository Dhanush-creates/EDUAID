/**
 * EduAI — User Routes  (Stage 2 scaffold)
 *
 * GET    /api/v1/user/profile    — get saved profile
 * PUT    /api/v1/user/profile    — update profile
 * GET    /api/v1/user/saved      — get saved schemes
 * POST   /api/v1/user/saved/:id  — save a scheme
 * DELETE /api/v1/user/saved/:id  — unsave a scheme
 */

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/user.controller');

router.get('/profile',        ctrl.getProfile);
router.put('/profile',        ctrl.updateProfile);
router.get('/saved',          ctrl.getSaved);
router.post('/saved/:id',     ctrl.saveScheme);
router.delete('/saved/:id',   ctrl.unsaveScheme);

module.exports = router;
