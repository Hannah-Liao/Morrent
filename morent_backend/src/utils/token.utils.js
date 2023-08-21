import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate an access token
export const generateAccessToken = (user, secret) => {
  return jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '1h',
  });
};

// Generate a refresh token
export const generateRefreshToken = (user, secret) => {
  return jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '7d',
  });
};

// JWT Key
export const secret = crypto.randomBytes(64).toString('hex');
