import jwt from 'jsonwebtoken';

export const generateToken = ({ payload, tokenSecret, expiresIn }) => {
  return jwt.sign(payload, tokenSecret, {
    expiresIn,
  });
};

export const sendCookie = ({ res, name, token }) => {
  res.cookie(name, token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'none',
  });
};
