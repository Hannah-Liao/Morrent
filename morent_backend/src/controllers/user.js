import bcrypt from 'bcrypt';

import UserModel from '../models/user.js';
import { secret } from '../utils/token.utils.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token.utils.js';

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

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      message: 'User created',
      user: newUser,
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

// export const addUser =  async (req, res) => {

//   try {
//     const user = await UserModel.findOne({ email: req.body.email });

//     if (user) {
//       return res.status(400).json({
//         message: 'User already exists',
//       });
//     }

//     const newUser = new UserModel(req.body);
//     await newUser.save();

//     console.log(newUser, 'New user created');

//     return res.status(200).json({
//       message: 'New user created',
//       user: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: 'Internal server error',
//     });
//   }
// };

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
};
