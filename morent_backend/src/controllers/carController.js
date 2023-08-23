import { Car } from '../models/Car.js';

// create new car model
export const createCar = async (req, res) => {
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();
    res.status(201).json({
      success: true,
      message: 'Successfully created',
      data: savedCar,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again' });
  }
};

// get all car
export const getCars = async (req, res) => {
  const page = parseInt(req.query.page) - 1;
  const { type, location, availabilityFrom, availabilityTo } = req.query;
  const capacity = parseInt(req.query.capacity);
  const price = parseInt(req.query.price);

  try {
    const cars = await Car.find({
      $and: [
        type ? { carType: type } : {},
        location ? { carLocation: location } : {},
        capacity ? { capacity: { $gte: capacity } } : {},
        price ? { price: price } : {},
        availabilityFrom ? { rentedDateFrom: availabilityFrom } : {},
        availabilityTo ? { rentedDateTo: availabilityTo } : {},
      ],
    })
      .sort({ createdAt: -1 })
      .skip(page * 12)
      .limit(12);
    res.status(200).json({
      success: true,
      count: cars.length,
      message: 'Successful get all cars model',
      cars,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'No cars found' });
  }
};

//delete car
export const deleteCar = async (req, res) => {
  const id = req.params.id;

  try {
    await Car.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Successfully deteled' });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to detele. Try again' });
  }
};

//update car
export const updateCar = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedCar,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update. Try again' });
  }
};
