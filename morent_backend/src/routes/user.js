import express from 'express';

import { authenticateUser } from '../middleware/auth.js';
import {
  signin,
  signup,
  logout,
  updateUser,
  showCurrentUser,
  deleteUser,
  viewUsers,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/current-user', authenticateUser, showCurrentUser);
router.post('/logout', authenticateUser, logout);
router.patch('/updateuser/:id', authenticateUser, updateUser);
router.delete('/deleteuser/:id', authenticateUser, deleteUser);
router.get('/viewusers', authenticateUser, viewUsers);

export default router;
