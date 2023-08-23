import express from 'express';

import { UserModel } from '../models/userModel.js';
import schemaMiddleware from '../middlewaresssss/schemaMiddleware.js';

const router = express.Router();

router.post('/add-user', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const newUser = new UserModel(req.body);
    await newUser.save();

    console.log(newUser, 'New user created');

    return res.status(200).json({
      message: 'New user created',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.patch('/update-user/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const updatedUserData = req.body;

    // do the validation for up

    // Find the user by ID
    const user = await UserModel.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    schemaMiddleware(UserModel.schema, req.body);

    return res.status(200).json({
      message: 'User updated successfully',
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export { router as userRouter };
