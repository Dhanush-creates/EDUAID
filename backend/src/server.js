/**
 * EduAI BACKEND — Server Entry Point
 * Stage 2 scaffold.
 */

require('dotenv').config();

const app = require('./app');
const connectDB = require('../config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`EduAI API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
