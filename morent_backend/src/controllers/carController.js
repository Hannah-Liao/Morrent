import { Car } from '../models/Car.js';
import User from '../models/user.js';

// create new car
export const createCar = async (req, res) => {
  // if (req.files.length < 1) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: 'Failed to create. Try again' });
  // }

  // const files = req.files.map((file) => `${process.env.BASE_URL}/${file.path}`);

  // req.body.carImages = files;
  req.body.user = req.userId;
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

// get cars
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

//delete a car
export const deleteCar = async (req, res) => {
  // const userID = req.userId;
  const carId = req.params.id;

  try {
    // const foundCar = await Car.findById(carId);

    // if (foundCar.user.equals(userID)) {
    //   // delete the car in user favcars
    //   const user = await User.findOneAndUpdate(
    //     { _id: userID },
    //     { $pull: { favCars: carId } },
    //     { new: true }
    //   );
    // delete the car
    await Car.findByIdAndDelete(carId);
    res
      .status(200)
      .json({ success: true, message: 'Successfully deleted', data: user });
    // } else {
    //   res
    //     .status(403)
    //     .json({ success: true, message: 'This car not belongs to this user' });
    // }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to deleted. Try again' });
  }
};

//update a car
export const updateCar = async (req, res) => {
  // const userID = req.userId;
  const carId = req.params.id;

  const extractImageUrls = (formDataString) => {
    if (formDataString) {
      const urlArray = formDataString.split(',');
      const imageUrls = urlArray.map((url) => decodeURIComponent(url.trim()));
      return imageUrls;
    }
    return [];
  };

  const imagesArrayFromForm = extractImageUrls(req.body.carImages);

  try {
    // const foundCar = await Car.findById(carId);
    let files = [];
    // if (foundCar.user.equals(userID)) {
    if (req.files.length > 0) {
      files = req.files.map((file) => `${process.env.BASE_URL}/${file.path}`);
    }

    req.body.carImages = req.body.carImages
      ? [...imagesArrayFromForm, ...files]
      : files;

    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedCar,
    });
    // } else {
    //   res
    //     .status(403)
    //     .json({ success: true, message: 'This car not belongs to this user' });
    // }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update. Try again' });
  }
};

// add fav cars
export const addFavCar = async (req, res) => {
  try {
    const userID = req.userId;
    const user = await User.findById(userID);

    user.favCars.unshift(req.body.carID);
    await user.save();
    res.status(200).json({ favCars: user.favCars });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server issue',
    });
  }
};

// get fav cars
export const getFavCars = async (req, res) => {
  const userID = req.userId;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const start = (page - 1) * 12;
  const end = page * 12;

  try {
    const user = await User.findById(userID).populate('favCars');
    const favCars = user.favCars;

    res.status(200).json({
      success: true,
      count: favCars.length,
      favCars: favCars.slice(start, end),
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found' });
  }
};

// delete fav cars
export const deleteFavCarID = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { favCars: req.body.carID } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Successfully removed a fav car',
      data: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to detele. Try again' });
  }
};

// get a single car
export const getSingleCar = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Car.findById(id);

    res
      .status(200)
      .json({ success: true, message: 'Successfully get a car', data: car });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found' });
  }
};
