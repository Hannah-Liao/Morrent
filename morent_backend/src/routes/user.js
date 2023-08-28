import express from 'express';

import { authenticateUser } from '../middleware/auth.js';
import { signin, signup, logout, updateUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.patch('update-user/:id', authenticateUser, updateUser);

export default router;
