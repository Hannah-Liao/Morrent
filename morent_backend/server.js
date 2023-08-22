import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import checkout from './src/routes/checkout.js';
import upload from './src/routes/fileUpload.js';

import connectToDatabase from './src/configs/db.js';
import userRouter from './src/routes/user.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// stripe

app.use('/', checkout);

app.use('/', upload);

// connect db

connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
