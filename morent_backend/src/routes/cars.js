import express from 'express';

import { CarModel } from '../models/CarModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const user = new CarModel({ title: 'Audi', type: 'Sedan' });
  console.log(user);

  await user.save().then((data) => {
    console.log('saved data', data);
  });

  res.send('Cars Page');
});

router.post('/add-car', (req, res) => {});

export { router as carRouter };
