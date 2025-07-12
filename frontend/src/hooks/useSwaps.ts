import { useState, useEffect } from 'react';
import { swapService, SwapRequest, CreateSwapRequestData, UpdateSwapRequestData } from '../services/swapService';

export const useSwaps = () => {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSwapRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const requests = await swapService.getUserSwapRequests();
      setSwapRequests(requests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch swap requests');
    } finally {
      setLoading(false);
    }
  };

  const createSwapRequest = async (requestData: CreateSwapRequestData): Promise<SwapRequest> => {
    setLoading(true);
    setError(null);

    try {
      const newRequest = await swapService.createSwapRequest(requestData);
      setSwapRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create swap request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSwapRequest = async (id: string, updates: UpdateSwapRequestData): Promise<SwapRequest> => {
    setLoading(true);
    setError(null);

    try {
      const updatedRequest = await swapService.updateSwapRequest(id, updates);
      setSwapRequests(prev =>
        prev.map(req => req.id === id ? updatedRequest : req)
      );
      return updatedRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update swap request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSwapRequest = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await swapService.deleteSwapRequest(id);
      setSwapRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete swap request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  return {
    swapRequests,
    loading,
    error,
    createSwapRequest,
    updateSwapRequest,
    deleteSwapRequest,
    refetch: fetchSwapRequests,
  };
};