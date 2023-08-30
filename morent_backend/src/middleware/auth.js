import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = data.id;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
