import { apiClient } from './api';

export interface SwapRequest {
  id: string;
  requesterId: string;
  targetUserId: string;
  offeredSkill: string;
  requestedSkill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSwapRequestData {
  targetUserId: string;
  offeredSkill: string;
  requestedSkill: string;
  message?: string;
}

export interface UpdateSwapRequestData {
  status?: 'accepted' | 'rejected' | 'cancelled';
  message?: string;
}

export const swapService = {
  // Create a new swap request
  async createSwapRequest(requestData: CreateSwapRequestData): Promise<SwapRequest> {
    return apiClient.createSwapRequest(requestData);
  },

  // Update a swap request
  async updateSwapRequest(id: string, updates: UpdateSwapRequestData): Promise<SwapRequest> {
    return apiClient.updateSwapRequest(id, updates);
  },

  // Get user's swap requests
  async getUserSwapRequests(): Promise<SwapRequest[]> {
    return apiClient.getUserSwapRequests();
  },

  // Get all swap requests (for admin)
  async getAllSwapRequests(): Promise<SwapRequest[]> {
    return apiClient.getAllSwapRequests();
  },

  // Delete a swap request
  async deleteSwapRequest(id: string): Promise<void> {
    return apiClient.deleteSwapRequest(id);
  },
};