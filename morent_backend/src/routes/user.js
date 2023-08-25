import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';

import { signin, signup, logout } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', authenticateUser, logout);
// router.post('/', authenticateUser, addCar);
// router.post('/update-user', authenticateUser, updateUser);

export default router;
