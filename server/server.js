import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
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
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/session', sessionRoutes);
app.get('/', (req, res) => {
  res.send('Server root');
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
