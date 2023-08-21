import express from 'express';
const router = express.Router();

import { signin, signup, logout } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
// router.post('/protected', protectedRoute);

export default router;
