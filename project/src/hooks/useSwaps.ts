import { useState } from 'react';
import { SwapRequest } from '../types';
import { swapService } from '../services/swapService';

export const useSwaps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSwapRequest = async (requestData: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<SwapRequest> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newRequest = await swapService.createSwapRequest(requestData);
      return newRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create swap request';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSwapRequest = async (id: string, updates: Partial<SwapRequest>): Promise<SwapRequest> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedRequest = await swapService.updateSwapRequest(id, updates);
      return updatedRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update swap request';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserSwapRequests = async (userId: string): Promise<SwapRequest[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const requests = await swapService.getUserSwapRequests(userId);
      return requests;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get swap requests';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    createSwapRequest,
    updateSwapRequest,
    getUserSwapRequests,
    clearError,
  };
};