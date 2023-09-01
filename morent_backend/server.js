import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import checkout from './src/routes/checkout.js';
import connectToDatabase from './src/configs/db.js';
import carRouter from './src/routes/cars.js';
import userRouter from './src/routes/user.js';
import rentedCarRouter from './src/routes/carRented.js';
import { authenticateUser } from './src/middleware/auth.js';
import filesUpload from './src/routes/fileUpload.js';
import webhook from './src/routes/webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const corsAllowUrl =
  process.env.NODE_ENV === 'dev' ? process.env.CLIENT_URL : '';

// Middleware
app.use(
  cors({
    credentials: true,
    origin: corsAllowUrl,
  })
);

const setCorsHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(setCorsHeaders);
app.use(cookieParser());
app.use(express.static(join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

app.use('/api/car', carRouter);
app.use('/api/user', userRouter);
app.use('/api/rented-car', authenticateUser, rentedCarRouter);
app.use('/', checkout);
app.use('/webhook', webhook);
app.use('/', filesUpload);

connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
