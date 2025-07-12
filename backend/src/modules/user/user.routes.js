import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUserProfile,
  updateUserProfile,
  logoutUser,
  searchUsers,
  getUserById,
  getUserFeedback
} from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// User search (public)
router.get('/search', searchUsers);

// Protected Routes
router.route('/profile')
  .get(protect, getCurrentUserProfile)
  .put(protect, updateUserProfile);

// Get user by ID (public)
router.get('/:id', getUserById);

// Get user feedback (public)
router.get('/:id/feedback', getUserFeedback);

export default router;
