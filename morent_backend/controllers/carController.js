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
  const page = parseInt(req.query.page);

  try {
    const cars = await Car.find({})
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
    res.status(404).json({ success: false, message: 'Not found' });
  }
};

//delete car
export const deleteCar = async (req, res) => {
  const id = req.params.id;

  try {
    await Car.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: 'Successfully deteled a car model' });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to detele. Try again' });
  }
};

//get popular cars
export const getPopularCars = async (req, res) => {
  try {
    const popularCars = await Car.find({ popular: true }).limit(8);

    res
      .status(200)
      .json({ success: true, message: 'Successful', data: popularCars });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found' });
  }
};

//get cars by search
export const getCarsBySearch = async (req, res) => {
  //"i" means case sensitive
  const carType = req.query.carType;
  const capacity = parseInt(req.query.capacity);
  const price = parseInt(req.query.price);

  try {
    const cars = await Car.find({
      carType,
      capacity: { $gte: capacity },
      price: { $lte: price },
    });

    res.status(200).json({ success: true, message: 'Successful', data: cars });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found' });
  }
};
