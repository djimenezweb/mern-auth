import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import { corsOptions } from './config/corsOptions.js';
import cookieParser from 'cookie-parser';

const app = express();

if (typeof process.env.PORT === 'undefined') {
  throw new Error('Environment variable PORT is undefined');
}

const port = process.env.PORT;

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Artificial delay for testing purposes
// app.use((req, res, next) => setTimeout(next, 3000));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start server
async function startServer() {
  try {
    await connectDB();
    console.log('Connected to database');
  } catch (error) {
    console.log('Failed to connect to database', error);
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
