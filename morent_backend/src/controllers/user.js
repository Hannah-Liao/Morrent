import bcrypt from 'bcrypt';

import { secret } from '../utils/token.utils.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token.utils.js';
import UserModel from '../models/user.js';

// User Signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res
        .status(400)
        .json({ message: 'User already exists', email: user.email });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser, secret);
    const refreshToken = generateRefreshToken(newUser, secret);

    // Set the "access_token" and "refresh_token" cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true, // used during the development of the application
      secure: true, // used during the production environment with HTTPS
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      message: 'User created',
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

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
        .json({ message: "User doesn't exist", email: user.email });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: 'Invalid credentials', email: user.email });

    const accessToken = generateAccessToken(oldUser, secret);
    const refreshToken = generateRefreshToken(oldUser, secret);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: 'Successfully logged in',
      email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', email });
  }
};

// User Logout
export const logout = (req, res) => {
  try {
    // const access_token = req.cookies.access_token;
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ message: `Successfully logged out` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during logout' });
  }
};
