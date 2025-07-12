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
      requester: req.user.id,
      recipient: req.body.recipient,
      skillOffered: req.body.skillOffered,
      skillRequested: req.body.skillRequested,
      message: req.body.message
    };
    const swap = await createSwapRequest(data);
    return successResponse(res, swap, 'Swap request sent', 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const swaps = await getSwapRequests({ requester: req.user.id });
    return successResponse(res, swaps);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const getSwapRequestsForMe = async (req, res) => {
  try {
    const swaps = await getSwapRequests({ recipient: req.user.id });
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
