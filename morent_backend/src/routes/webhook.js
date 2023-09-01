import dotenv from 'dotenv';
dotenv.config();

import { raw, Router } from 'express';
import Stripe from 'stripe';

const router = Router();
const stripeInit = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', raw({ type: 'application/json' }), async (req, res) => {
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object.metadata;
    const datas = JSON.parse(session.data);
    const {
      rentData: { location, pickUpDate, dropOffDate, pickUpTime, dropOffTime },
      price,
      carId,
      userId,
    } = datas;

    try {
      if (
        !location ||
        !pickUpDateTime ||
        !dropOffDateTime ||
        !carId ||
        !userId
      ) {
        return res.json({ error: true, message: 'All fields required' });
      }

      const currentCar = await Car.findById(carId);
      const rentedDateTo = new Date(currentCar.rentedDateTo).getDate();
      const userPickUpDate = new Date(pickUpDateTime).getDate();

      if (rentedDateTo > userPickUpDate) {
        return res.json({
          error: true,
          message: 'This car is not available for rent',
        });
      }

      const newRentedCar = await RentedCarModel.create({
        location,
        pickUpDateTime,
        dropOffDateTime,
        carId,
        userId,
      });

      const updatedCar = await currentCar.updateOne(
        carId,
        {
          rentedDateFrom: pickUpDateTime,
          rentedDateTo: dropOffDateTime,
          $inc: { numberOfTimesRented: 1 },
        },
        {
          new: true,
        }
      );

      res.status(201).json({
        message: 'Rented Car Created',
        success: true,
        rentedCar: newRentedCar,
        updatedCar,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        const errorMessage = errorMessages.join(', ');
        res.json({ error: true, message: errorMessage });
      } else {
        res.json({ error: true, message: error.message });
      }
    }
  }
});

export default router;
