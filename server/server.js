require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');
const userRouter = require('./routes/user');

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('method:', req.method, 'path:', req.path);
  next();
});

// routes
app.use('/api/workouts/', workoutsRouter);
app.use('/api/user/', userRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to database');
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => console.log(error));
