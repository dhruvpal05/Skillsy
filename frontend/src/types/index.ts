// Core type definitions for the Skillsy Platform

export interface User {
  id: string;
  email: string;
  name: string;
  location: string;
  profilePhoto?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: 'available' | 'busy' | 'offline';
  isPublic: boolean;
  rating: number;
  totalSwaps: number;
  joinedDate: string;
  lastActive: string;
  isBanned?: boolean;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  targetUserId: string;
  offeredSkill: string;
  requestedSkill: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Feedback {
  id: string;
  swapId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchFilters {
  skill?: string;
  location?: string;
  availability?: string;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}