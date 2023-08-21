import express from 'express';

const router = express.Router();

router.post('/add-user', (req, res) => {
  let userData = req.body;
  console.log(userData, 'userData');
  res.send('Add user form');
});

export { router as userRouter };
