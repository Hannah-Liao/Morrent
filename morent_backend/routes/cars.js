import { Router } from 'express';

import {
  createCar,
  getCars,
  deleteCar,
  getPopularCars,
  getCarsBySearch,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getCars);
router.post('/', createCar);
router.delete('/:id', deleteCar);
router.get('/getPopularCars', getPopularCars);
router.get('/search/getCarsBySearch', getCarsBySearch);

export default router;
