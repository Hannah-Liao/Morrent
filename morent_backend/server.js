import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import checkout from './src/routes/checkout.js';
import connectToDatabase from './src/configs/db.js';
import { carRouter } from './src/routes/cars.js';
import { userRouter } from './src/routes/user.js';

// Connect to Express
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// SCHEMA

// Routes
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// stripe
app.use('/', checkout);
app.use('/cars', carRouter);

// User routes
app.use('/user', userRouter);

// connect db

connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
