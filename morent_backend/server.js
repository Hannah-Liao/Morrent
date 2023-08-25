import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import checkout from './src/routes/checkout.js';
import connectToDatabase from './src/configs/db.js';
import userRouter from './src/routes/user.js';
import filesUpload from './src/routes/fileUpload.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// stripe

app.use('/', checkout);

app.use('/', filesUpload);

// connect db

connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
