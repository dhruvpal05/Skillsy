import {
  createSwapRequest,
  getSwapRequests,
  getSwapRequestById,
  updateSwapRequestStatus,
  deleteSwapRequest
} from './swap.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const sendSwapRequest = async (req, res) => {
  try {
    const data = {
      requesterId: req.user.id,
      targetUserId: req.body.targetUserId,
      offeredSkill: req.body.offeredSkill,
      requestedSkill: req.body.requestedSkill,
      message: req.body.message
    };
    const swap = await createSwapRequest(data);
    return successResponse(res, swap, 'Swap request sent', 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Create swap request (frontend endpoint)
export const createSwapRequestController = async (req, res) => {
  try {
    const data = {
      requesterId: req.user.id,
      targetUserId: req.body.targetUserId,
      offeredSkill: req.body.offeredSkill,
      requestedSkill: req.body.requestedSkill,
      message: req.body.message
    };
    const swap = await createSwapRequest(data);
    return successResponse(res, swap, 'Swap request created', 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const swaps = await getSwapRequests({ requesterId: req.user.id });
    return successResponse(res, swaps);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getSwapRequestsForMe = async (req, res) => {
  try {
    const swaps = await getSwapRequests({ targetUserId: req.user.id });
    return successResponse(res, swaps);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Get user's swap requests
export const getUserSwapRequests = async (req, res) => {
  try {
    const swaps = await getSwapRequests({
      $or: [{ requesterId: req.user.id }, { targetUserId: req.user.id }]
    });
    return successResponse(res, swaps);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Get all swap requests (admin only)
export const getAllSwapRequests = async (req, res) => {
  try {
    const swaps = await getSwapRequests({});
    return successResponse(res, swaps);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const respondToSwapRequest = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400);
    }
    const swap = await updateSwapRequestStatus(req.params.id, status);
    if (!swap) return errorResponse(res, 'Swap request not found', 404);
    return successResponse(res, swap, `Swap request ${status}`);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Update swap request
export const updateSwapRequest = async (req, res) => {
  try {
    const { id, ...updates } = req.body;
    const swap = await updateSwapRequestById(id, updates);
    if (!swap) return errorResponse(res, 'Swap request not found', 404);
    return successResponse(res, swap, 'Swap request updated');
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const cancelSwapRequest = async (req, res) => {
  try {
    const swap = await updateSwapRequestStatus(req.params.id, 'cancelled');
    if (!swap) return errorResponse(res, 'Swap request not found', 404);
    return successResponse(res, swap, 'Swap request cancelled');
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const deleteSwapRequestController = async (req, res) => {
  try {
    const deleted = await deleteSwapRequest(req.params.id, req.user.id);
    if (!deleted) return errorResponse(res, 'Cannot delete swap request', 403);
    return successResponse(res, null, 'Swap request deleted');
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Delete swap request (frontend endpoint)
export const deleteSwapRequestByBody = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await deleteSwapRequest(id, req.user.id);
    if (!deleted) return errorResponse(res, 'Cannot delete swap request', 403);
    return successResponse(res, null, 'Swap request deleted');
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};
