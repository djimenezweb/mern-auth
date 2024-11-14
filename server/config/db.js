import mongoose from 'mongoose';

if (typeof process.env.MONGODB_URI === 'undefined') {
  throw new Error('Environment variable MONGODB_URI is undefined');
}

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
}
