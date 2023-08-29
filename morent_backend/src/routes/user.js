import express from 'express';

import { authenticateUser } from '../middleware/auth.js';
import {
  signin,
  signup,
  logout,
  updateUser,
  deleteUser,
  viewUsers,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', authenticateUser, logout);
router.patch('/updateuser/:id', authenticateUser, updateUser);
router.delete('/deleteuser/:id', authenticateUser, deleteUser);
router.get('/viewusers', authenticateUser, viewUsers);

// router.post('/protected', protectedRoute);
// router.post('/', authenticateUser, addCar);
// router.post('/update-user', authenticateUser, updateUser);

export default router;
