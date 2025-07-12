import {
  createFeedback,
  getFeedbackForUser,
  getFeedbackBySwap,
  getAllFeedback
} from './feedback.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const addFeedback = async (req, res) => {
  try {
    const data = {
      swapRequest: req.body.swapRequest,
      fromUser: req.user.id,
      toUser: req.body.toUser,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    const feedback = await createFeedback(data);
    return successResponse(res, feedback, 'Feedback submitted', 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await getFeedbackForUser(req.params.userId);
    return successResponse(res, feedbacks);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getSwapFeedback = async (req, res) => {
  try {
    const feedbacks = await getFeedbackBySwap(req.params.swapRequestId);
    return successResponse(res, feedbacks);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getAllFeedback();
    return successResponse(res, feedbacks);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};
