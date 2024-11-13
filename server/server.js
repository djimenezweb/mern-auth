import express from 'express';
import { connectDB } from './config/db.js';

const app = express();

if (typeof process.env.PORT === 'undefined') {
  throw new Error('Environment variable PORT is undefined');
}

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Auth API');
});

async function startServer() {
  try {
    await connectDB();
    console.log('Connected to database');
  } catch (error) {
    console.log('Failed to connect to database');
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
