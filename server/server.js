import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { corsOptions } from './config/corsOptions.js';
import cookieParser from 'cookie-parser';

const app = express();

if (typeof process.env.PORT === 'undefined') {
  throw new Error('Environment variable PORT is undefined');
}

const port = process.env.PORT;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);

  res.status(200).json(req.headers);
  // res.send('Server root');
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
