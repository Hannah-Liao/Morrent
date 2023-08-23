import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (user, secret, expiry) => {
  return jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: expiry,
  });
};

export const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
  });
};

// JWT Key
export const secret = crypto.randomBytes(64).toString('hex');
