import express from 'express';
process.env.TZ = 'UTC';
import RentedCarModel from '../models/rentedCar.js';
import { Car } from '../models/Car.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      location,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      carId,
      userId,
    } = req.body;
    if (
      !location ||
      !pickUpDate ||
      !pickUpTime ||
      !dropOffDate ||
      !dropOffTime ||
      !carId ||
      !userId
    ) {
      return res.json({ error: true, message: 'All fields required' });
    }
    const currentCars = await Car.findById(carId);
    const rentedDateTo = new Date(currentCars.rentedDateTo).getDate();
    const currentDate = new Date().getDate();

    if (rentedDateTo > currentDate) {
      return res.json({
        error: true,
        message: 'This car is not available for rent in current date',
      });
    }
    await RentedCarModel.create({
      location,
      pickUpTime,
      dropOffTime,
      pickUpDate,
      dropOffDate,
      carId,
      userId,
    });

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        rentedDateFrom: pickUpDate,
        rentedDateTo: dropOffDate,
        $inc: { numberOfTimesRented: 1 },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: 'Rented Car Created',
      success: true,
      rentedCar: updatedCar,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      const errorMessage = errorMessages.join(', ');
      console.log({ errorMessage });
      return res.json({ error: true, message: errorMessage });
    } else {
      return res.json({ error: true, message: error.message });
    }
  }
});

export default router;
