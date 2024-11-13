import mongoose from 'mongoose';

// export async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//   } catch (error) {
//     console.error(error);
//   }
// }

if (typeof process.env.MONGODB_URI === 'undefined') {
  throw new Error('Environment variable MONGODB_URI is undefined');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    // throw e;
    throw new Error('Failed to connect to the database');
  }
  return cached.conn;
}
