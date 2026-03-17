/**
 * EduAI BACKEND — Express App
 *
 * Stage 2 scaffold — not yet active.
 * Uncomment and wire up when Stage 2 begins.
 *
 * Architecture:
 *   app.js      — Express instance, middleware, routes
 *   server.js   — HTTP server start (imports app.js)
 */

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');

// Routes (Stage 2)
const authRoutes    = require('./routes/auth.routes');
const schemesRoutes = require('./routes/schemes.routes');
const userRoutes    = require('./routes/user.routes');

// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ── Security & parsing middleware ──
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Health check ──
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', stage: 1, timestamp: new Date().toISOString() });
});

// ── API routes (Stage 2) ──
app.use('/api/v1/auth',    authRoutes);
app.use('/api/v1/schemes', schemesRoutes);
app.use('/api/v1/user',    userRoutes);

// ── 404 handler ──
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ──
app.use(errorHandler);

module.exports = app;
