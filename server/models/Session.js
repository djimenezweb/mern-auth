import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionToken: { type: String },
  userId: { type: String },
  valid: { type: Boolean },
  userAgent: { type: String },
  ip: { type: String },
  updatedAt: { type: Date },
  createdAt: { type: Date },
});

export const Session = mongoose.model('Session', sessionSchema);
