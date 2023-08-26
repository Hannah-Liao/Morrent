import express from 'express';

export { router as userRouter };
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';

import { signin, signup, logout, updateUser } from '../controllers/user.js';
import { authenticateUser } from '../middleware/auth.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', authenticateUser, logout);
router.patch('update-user/:id', authenticateUser, updateUser);
// router.post('/protected', protectedRoute);
// router.post('/', authenticateUser, addCar);
// router.post('/update-user', authenticateUser, updateUser);

export default router;
