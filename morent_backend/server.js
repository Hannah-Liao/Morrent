import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Connect to Express
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log('MongoDB is connected to the host'));

// Middleware
app.use(cors());
app.use(express.json());

// SCHEMA

// Routes
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(8004, () => console.log('Server is running on port 8004'));
