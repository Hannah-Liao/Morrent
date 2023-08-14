import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import stripe from 'stripe'

import connectToDatabase from './src/configs/db.js';

// Connect to Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY)

// SCHEMA

// Routes
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// stripe
app.post('/create-checkout-session', async (req, res) => {
  const { id, name, price } = req.body
  const session = await stripeInit.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,

  });

  res.send({ url: session.url }).end()
});

// connect db
connectToDatabase()
  .then(() => {
    app.listen(8004, () => console.log('Server is running on port 8004'));
  })
  .catch((error) => {
    console.error('Error connecting to database. Server not started.');
  });
