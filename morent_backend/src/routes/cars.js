import { Router } from 'express';

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
router.post('/', createCar);
router.put('/add-fav-car', addFavCar);
router.get('/fav-car/:userID', getFavCars);
router.patch('/delete-fav-car/:userID', deleteFavCarID);
router.delete('/delete/:id', deleteCar);
router.put('/update/:id', updateCar);

export default router;
