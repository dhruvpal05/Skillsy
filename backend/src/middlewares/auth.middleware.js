// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded); // Log decoded token
      const user = await User.findById(decoded.id).select('-password');
      console.log('User found by token:', user); // Log user lookup result
      req.user = user;
      next();
    } catch (error) {
      console.error('JWT error:', error);
      return errorResponse(res, 'Not authorized, token failed', 401);
    }
  }

  if (!token) {
    console.warn('No token provided in Authorization header');
    return errorResponse(res, 'Not authorized, no token', 401);
  }
};
