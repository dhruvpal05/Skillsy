import { renderHook, waitFor } from '@testing-library/react';
import { useUsers } from './useUsers';

// Mock the userService
jest.mock('../services/userService', () => ({
  userService: {
    searchUsers: jest.fn(),
    getUserById: jest.fn(),
  },
}));

import { userService } from '../services/userService';

const mockUserService = userService as jest.Mocked<typeof userService>;

describe('useUsers Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalUsers).toBe(0);
  });

  it('should handle successful user search', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          location: 'New York',
          skillsOffered: ['React'],
          skillsWanted: ['Python'],
          availability: 'available' as const,
          isPublic: true,
          rating: 4.5,
          totalSwaps: 10,
          joinedDate: '2023-01-01',
          lastActive: '2024-01-01',
        },
      ],
      total: 1,
      page: 1,
      limit: 12,
      totalPages: 1,
    };

    mockUserService.searchUsers.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUsers());

    const filters = {
      skill: 'React',
      location: '',
      availability: '',
      page: 1,
      limit: 12,
    };

    await result.current.searchUsers(filters);

    await waitFor(() => {
      expect(result.current.users).toEqual(mockResponse.data);
      expect(result.current.totalPages).toBe(1);
      expect(result.current.totalUsers).toBe(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('should handle search errors', async () => {
    const errorMessage = 'Search failed';
    mockUserService.searchUsers.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUsers());

    const filters = {
      skill: '',
      location: '',
      availability: '',
      page: 1,
      limit: 12,
    };

    await expect(result.current.searchUsers(filters)).rejects.toThrow(errorMessage);

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should get user by id successfully', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      location: 'New York',
      skillsOffered: ['React'],
      skillsWanted: ['Python'],
      availability: 'available' as const,
      isPublic: true,
      rating: 4.5,
      totalSwaps: 10,
      joinedDate: '2023-01-01',
      lastActive: '2024-01-01',
    };

    mockUserService.getUserById.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUsers());

    const user = await result.current.getUserById('1');

    expect(user).toEqual(mockUser);
    expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useUsers());

    // Manually set error for testing
    result.current.clearError();

    expect(result.current.error).toBe(null);
  });
});