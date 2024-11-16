import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
  ip: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const Session = mongoose.model('Session', sessionSchema);
