import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';

const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY);

export const checkout = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};
