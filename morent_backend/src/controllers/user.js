import bcrypt from 'bcrypt';

import {
  generateToken,
  setTokenCookies,
  secret,
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

    const accessToken = generateToken(newUser, secret, '1h');
    const refreshToken = generateToken(newUser, secret, '7d');

    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: 'User created',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// User Signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist", email });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials', email });

    const accessToken = generateToken(oldUser, secret, '10h');
    const refreshToken = generateToken(oldUser, secret, '7d');

    setTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: 'Successfully logged in',
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// User Logout
export const logout = (req, res) => {
  try {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ message: `Successfully logged out` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during logout' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const updatedUserData = req.body;
  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    if (userData.id === id) {
      // Find the user by ID
      const user = await UserModel.findByIdAndUpdate(id, updatedUserData, {
        new: true,
      });

      return res.status(200).json({
        message: 'User updated successfully',
        user: user,
      });
    } else {
      return res.status(404).json({
        message: 'This data not belong logged user',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// remove delete car also, using daleteMany where userId = id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.send({ message: 'No user find' });
    }

    if (user.id === id) {
      const deletedUser = await UserModel.findByIdAndDelete(user.id);

      return res.send({ message: 'User deleted', user });
    } else {
      return res
        .send(403)
        .json({ message: 'delete user does not belong to logged in user' });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const viewUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (!allUsers) {
      return res.json({ message: 'No user existed', allUsers: [] });
    }

    return res.send(allUsers);
  } catch (error) {
    res.status(500).json({ Error: 'some internal error' });
  }
};

// for one single user profile. Get one single info(like list of cars he added. etc)
// Use clockify
