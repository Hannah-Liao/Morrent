import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripeInit = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    let event;

    try {
      const signature = req.headers['stripe-signature'];
      const rawBody = req.rawBody.toString();
      event = stripeInit.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        res.json({
          message: 'PaymentIntent was successful!',
          paymentIntent,
        });
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        res.json({
          message: 'payment_method.attached',
          paymentMethod,
        });
        break;
      case 'charge.succeeded':
        const charge = event.data.object;
        res.json({
          message: 'charge.succeeded',
          charge,
        });
        break;
      case 'checkout.session.completed':
        const session = event.data.object;

        res.json({
          message: 'checkout.session.completed',
          session,
        });
        break;
      default:
        res.json({ message: 'something went wrong' });
    }
    res.end();
  }
);

export default router;
