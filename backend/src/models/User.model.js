/**
 * EduAI — User Model  (Stage 2 scaffold)
 * Mongoose schema for user accounts.
 */

// const mongoose = require('mongoose');
// const bcrypt   = require('bcryptjs');

/*
const UserSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },

    // Education profile
    profile: {
      age:    String,
      gender: String,
      state:  String,
      cat:    String,   // OBC | SC | ST | EWS | Minority | General
      inc:    String,   // income bracket key
      edu:    String,   // education level key
      marks:  String,
      stream: String,
    },

    savedSchemes: [{ type: String }],  // array of scheme IDs
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password helper
UserSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', UserSchema);
*/

// Uncomment above when Stage 2 begins
module.exports = {};
