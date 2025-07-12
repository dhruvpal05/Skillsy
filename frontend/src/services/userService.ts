import { apiClient } from './api';
import { User } from '../types';

export interface UserFilters {
  skill?: string;
  location?: string;
  availability?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const userService = {
  // Search users with filters
  async searchUsers(filters: UserFilters): Promise<PaginatedUsersResponse> {
    return apiClient.searchUsers(filters);
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    return apiClient.getUserById(id);
  },

  // Get current user profile
  async getUserProfile(): Promise<User> {
    return apiClient.getUserProfile();
  },

  // Update user profile
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.updateUserProfile(updates);
    return response.data;
  },

  // Get user feedback
  async getUserFeedback(userId: string): Promise<any[]> {
    return apiClient.getUserFeedback(userId);
  },
};