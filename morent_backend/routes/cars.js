import { Router } from 'express';

import {
  createCar,
  getCars,
  deleteCar,
  updateCar,
} from '../controllers/carController.js';

const router = Router();

router.get('/', getCars);
router.post('/', createCar);
router.delete('/delete/:id', deleteCar);
router.put('/update/:id', updateCar);

export default router;
