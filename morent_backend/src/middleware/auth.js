import jwt from 'jsonwebtoken';
import { secret } from '../utils/token.utils.js';

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, secret);
    req.userId = data.id;
    // req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
