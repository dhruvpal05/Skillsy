import express from 'express';
import {
  sendSwapRequest,
  getMySwapRequests,
  getSwapRequestsForMe,
  respondToSwapRequest,
  cancelSwapRequest,
  deleteSwapRequestController
} from './swap.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { swapValidation, swapStatusValidation } from './swap.validation.js';

const router = express.Router();

// Send a swap request
router.post('/', protect, swapValidation, sendSwapRequest);

// View my sent swap requests
router.get('/my', protect, getMySwapRequests);

// View swap requests sent to me
router.get('/received', protect, getSwapRequestsForMe);

// Accept or reject a swap request
router.patch('/:id/status', protect, swapStatusValidation, respondToSwapRequest);

// Cancel (by requester) or delete (if not accepted)
router.patch('/:id/cancel', protect, cancelSwapRequest);
router.delete('/:id', protect, deleteSwapRequestController);

export default router;
