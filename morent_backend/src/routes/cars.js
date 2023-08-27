import { Router } from 'express';

import { authenticateUser } from '../middleware/auth.js';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';

import {
  createCar,
  getCars,
  deleteCar,
  updateCar,
  addFavCar,
  getFavCars,
  deleteFavCarID,
  getSingleCar,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getCars);
router.post('/', fileUploadMiddleware, createCar);
router.put('/add-fav-car', authenticateUser, addFavCar);
router.get('/fav-car/:userID', authenticateUser, getFavCars);
router.patch('/delete-fav-car/:userID', authenticateUser, deleteFavCarID);
router.delete('/delete/:id', authenticateUser, deleteCar);
router.put('/update/:id', updateCar);
router.get('/get-single-car/:id', getSingleCar);

export default router;
