import { useState, useEffect } from 'react';
import { User, SearchFilters, PaginatedResponse } from '../types';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const searchUsers = async (filters: SearchFilters): Promise<PaginatedResponse<User>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await userService.searchUsers(filters);
      setUsers(response.data);
      setTotalPages(response.totalPages);
      setTotalUsers(response.total);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search users';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (id: string): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await userService.getUserById(id);
      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get user';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    users,
    isLoading,
    error,
    totalPages,
    totalUsers,
    searchUsers,
    getUserById,
    clearError,
  };
};