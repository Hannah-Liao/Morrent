import { Router } from 'express';

import { authenticateUser } from '../middleware/auth.js';

import {
  createCar,
  getCars,
  deleteCar,
  updateCar,
  addFavCar,
  getFavCars,
  deleteFavCarID,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getCars);
router.post('/', authenticateUser, createCar);
router.put('/add-fav-car', authenticateUser, addFavCar);
router.get('/fav-car/:userID', authenticateUser, getFavCars);
router.patch('/delete-fav-car/:userID', authenticateUser, deleteFavCarID);
router.delete('/delete/:id', authenticateUser, deleteCar);
router.put('/update/:id', authenticateUser, updateCar);

export default router;