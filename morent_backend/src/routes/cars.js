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
  getPopularCars,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getCars);
router.post('/', fileUploadMiddleware, authenticateUser, createCar);
router.put('/add-fav-car', authenticateUser, addFavCar);
router.get('/fav-car/:userId', authenticateUser, getFavCars);
router.patch('/delete-fav-car/:userId', authenticateUser, deleteFavCarID);
router.delete('/delete/:id', authenticateUser, deleteCar);
router.put('/update/:id', fileUploadMiddleware, authenticateUser, updateCar);
router.get('/get-single-car/:id', getSingleCar);
router.get('/popular', getPopularCars);

export default router;
