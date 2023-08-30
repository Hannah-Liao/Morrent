import bcrypt from 'bcrypt';

import UserModel from '../models/user.js';
import { generateToken, sendCookie } from '../utils/token.utils.js';

// User Signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({
        message: 'User already exists',
        email: email,
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const accessToken = generateToken({
      payload: { email: newUser.email, id: newUser._id },
      tokenSecret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = generateToken({
      payload: { email: newUser.email, id: newUser._id },
      tokenSecret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '10d',
    });

    sendCookie({ res, name: 'accesstoken', token: accessToken });
    sendCookie({ res, name: 'refreshtoken', token: refreshToken });

    res.status(201).json({
      message: 'User created',
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', success: false });

    console.log(error);
  }
};

// User Signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist", email, success: false });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: 'Invalid credentials', email, success: false });

    const accessToken = generateToken({
      payload: {
        email: oldUser.email,
        id: oldUser._id,
      },
      tokenSecret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = generateToken({
      payload: {
        email: oldUser.email,
        id: oldUser._id,
      },
      tokenSecret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '10d',
    });

    sendCookie({ res, name: 'accesstoken', token: accessToken });
    sendCookie({ res, name: 'refreshtoken', token: refreshToken });

    res.status(200).json({
      message: 'Successfully logged in',
      success: true,
      userId: oldUser.id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

// User Logout
export const logout = (req, res) => {
  try {
    res.status(200).json({ message: `Successfully logged out`, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred during logout', success: false });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
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
};
