import jwt from 'jsonwebtoken';
import { secret } from '../utils/token.utils.js';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('No authorization header');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('No token present');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};
