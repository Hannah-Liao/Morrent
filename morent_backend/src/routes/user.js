import express from 'express';

import { authenticateUser } from '../middleware/auth.js';
import { signin, signup, logout } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', authenticateUser, logout);

export default router;
