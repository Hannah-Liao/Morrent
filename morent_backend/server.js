import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import connectToDatabase from './src/configs/db.js';

// Connect to Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SCHEMA

// Routes
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// connect db
connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
