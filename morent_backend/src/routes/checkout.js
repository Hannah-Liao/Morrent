import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import stripe from 'stripe';

const router = express.Router();

const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY);

router.post('/checkout', async (req, res) => {
  const { carName, price } = req.body;

  const session = await stripeInit.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: carName,
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

  res.send({ url: session.url }).end();
});

export default router;
