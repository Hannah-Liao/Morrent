import express from 'express';

export { router as userRouter };
const router = express.Router();

import { signin, signup, logout, updateUser } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.patch('update-user/:id', updateUser);
// router.post('/protected', protectedRoute);

export default router;
