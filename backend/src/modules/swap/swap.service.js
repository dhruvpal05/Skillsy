import SwapRequest from './swap.model.js';

export const createSwapRequest = async (data) => {
  return await SwapRequest.create(data);
};

export const getSwapRequests = async (filter = {}) => {
  return await SwapRequest.find(filter)
    .populate('requester', 'name email')
    .populate('recipient', 'name email')
    .populate('skillOffered', 'name')
    .populate('skillRequested', 'name');
};

export const getSwapRequestById = async (id) => {
  return await SwapRequest.findById(id)
    .populate('requester', 'name email')
    .populate('recipient', 'name email')
    .populate('skillOffered', 'name')
    .populate('skillRequested', 'name');
};

export const updateSwapRequestStatus = async (id, status) => {
  return await SwapRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const deleteSwapRequest = async (id, userId) => {
  // Only allow deletion if the requester is the current user and status is pending
  return await SwapRequest.findOneAndDelete({
    _id: id,
    requester: userId,
    status: 'pending'
  });
};
