import { SwapRequest, ApiResponse } from '../types';

// Mock data for development
const MOCK_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: '1',
    requesterId: '1',
    targetUserId: '2',
    offeredSkill: 'React',
    requestedSkill: 'Python',
    message: 'I would love to learn Python from you while teaching React!',
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    requesterId: '2',
    targetUserId: '3',
    offeredSkill: 'Data Science',
    requestedSkill: 'GraphQL',
    message: 'Interested in learning GraphQL, can teach data science in return.',
    status: 'accepted',
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
  },
];

/**
 * Service for swap request operations
 */
export const swapService = {
  /**
   * Create a new swap request
   */
  async createSwapRequest(
    requestData: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<SwapRequest> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newRequest: SwapRequest = {
      ...requestData,
      id: `swap_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_SWAP_REQUESTS.push(newRequest);
    return newRequest;
  },

  /**
   * Update an existing swap request
   */
  async updateSwapRequest(id: string, updates: Partial<SwapRequest>): Promise<SwapRequest> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const requestIndex = MOCK_SWAP_REQUESTS.findIndex(req => req.id === id);
    if (requestIndex === -1) {
      throw new Error('Swap request not found');
    }

    const updatedRequest: SwapRequest = {
      ...MOCK_SWAP_REQUESTS[requestIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    MOCK_SWAP_REQUESTS[requestIndex] = updatedRequest;
    return updatedRequest;
  },

  /**
   * Get swap requests for a specific user
   */
  async getUserSwapRequests(userId: string): Promise<SwapRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return MOCK_SWAP_REQUESTS.filter(
      req => req.requesterId === userId || req.targetUserId === userId
    );
  },

  /**
   * Get all swap requests (admin only)
   */
  async getAllSwapRequests(): Promise<SwapRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return MOCK_SWAP_REQUESTS;
  },

  /**
   * Delete a swap request
   */
  async deleteSwapRequest(id: string): Promise<ApiResponse<null>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const requestIndex = MOCK_SWAP_REQUESTS.findIndex(req => req.id === id);
    if (requestIndex === -1) {
      throw new Error('Swap request not found');
    }

    MOCK_SWAP_REQUESTS.splice(requestIndex, 1);

    return {
      data: null,
      success: true,
      message: 'Swap request deleted successfully',
    };
  },
};