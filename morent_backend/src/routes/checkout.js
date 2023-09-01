import express from 'express';
import stripe from 'stripe';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY);

router.post('/checkout', authenticateUser, async (req, res) => {
  const { data: rentData, userId, carName, price, id } = req.body;
  const customer = await stripeInit.customers.create({
    metadata: {
      data: JSON.stringify({ rentData, userId: req.userId, price, carId: id }),
    },
  });

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
    customer: customer.id,
    metadata: customer.metadata,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.send({ url: session.url }).end();
});

export default router;
