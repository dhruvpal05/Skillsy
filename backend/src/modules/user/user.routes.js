import express from 'express';
import { registerUser, loginUser, getCurrentUserProfile, updateUserProfile, logoutUser } from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js'; // Import middleware
import upload from '../../middlewares/upload.middleware.js';
import { updateProfilePhoto } from './user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Routes
router.route('/profile')
.get(protect, getCurrentUserProfile)
.put(protect, updateUserProfile);

router.put('/profile/photo', protect, upload.single('profilePhoto'), updateProfilePhoto);

export default router;
