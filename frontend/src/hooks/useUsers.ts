import { useState, useEffect, useCallback } from 'react';
import { userService, UserFilters, PaginatedUsersResponse } from '../services/userService';
import { User } from '../types';

export const useUsers = (filters: UserFilters = {}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: PaginatedUsersResponse = await userService.searchUsers({
        page: 1,
        limit: 12,
        ...filters,
      });

      setUsers(response.data);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadMore = async () => {
    if (pagination.page >= pagination.totalPages) return;

    setLoading(true);
    try {
      const response: PaginatedUsersResponse = await userService.searchUsers({
        ...filters,
        page: pagination.page + 1,
        limit: pagination.limit,
      });

      setUsers(prev => [...prev, ...response.data]);
      setPagination(prev => ({
        ...prev,
        page: response.page,
        total: response.total,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    refetch: fetchUsers,
    loadMore,
  };
};