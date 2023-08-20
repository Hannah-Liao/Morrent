import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToDatabase from './src/configs/db.js';
import userRouter from './src/routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
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
