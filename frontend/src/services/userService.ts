import { User, SearchFilters, PaginatedResponse, ApiResponse } from '../types';

// Mock data for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['React', 'TypeScript', 'Node.js'],
    skillsWanted: ['Python', 'Machine Learning', 'Data Science'],
    availability: 'available',
    isPublic: true,
    rating: 4.8,
    totalSwaps: 15,
    joinedDate: '2023-01-15',
    lastActive: '2024-01-21T10:00:00Z',
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    location: 'New York, NY',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
    skillsWanted: ['React', 'TypeScript', 'Frontend Design'],
    availability: 'available',
    isPublic: true,
    rating: 4.9,
    totalSwaps: 23,
    joinedDate: '2023-02-10',
    lastActive: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    location: 'Austin, TX',
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['Node.js', 'GraphQL', 'MongoDB'],
    skillsWanted: ['DevOps', 'Docker', 'AWS'],
    availability: 'busy',
    isPublic: true,
    rating: 4.7,
    totalSwaps: 18,
    joinedDate: '2023-03-15',
    lastActive: '2024-01-19T15:30:00Z',
  },
];

/**
 * Service for user-related API operations
 */
export const userService = {
  /**
   * Search users with filters and pagination
   */
  async searchUsers(filters: SearchFilters): Promise<PaginatedResponse<User>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredUsers = MOCK_USERS.filter(user => user.isPublic);

    // Apply skill filter
    if (filters.skill) {
      const skillQuery = filters.skill.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.skillsOffered.some(skill => skill.toLowerCase().includes(skillQuery)) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(skillQuery))
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.location.toLowerCase().includes(locationQuery)
      );
    }

    // Apply availability filter
    if (filters.availability && filters.availability !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        user.availability === filters.availability
      );
    }

    // Calculate pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredUsers.length / filters.limit);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    };
  },

  /**
   * Get a specific user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const user = MOCK_USERS.find(u => u.id === id);
    return user || null;
  },

  /**
   * Update user profile
   */
  async updateUser(id: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const userIndex = MOCK_USERS.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };

    return {
      data: MOCK_USERS[userIndex],
      success: true,
      message: 'Profile updated successfully',
    };
  },

  /**
   * Get user's feedback/ratings
   */
  async getUserFeedback(userId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock feedback data
    return [
      {
        id: '1',
        swapId: '1',
        fromUserId: '2',
        toUserId: userId,
        rating: 5,
        comment: 'Excellent teacher! Very patient and knowledgeable.',
        createdAt: '2024-01-10T10:00:00Z',
      },
      {
        id: '2',
        swapId: '2',
        fromUserId: '3',
        toUserId: userId,
        rating: 4,
        comment: 'Great communication and well-prepared lessons.',
        createdAt: '2024-01-05T14:30:00Z',
      },
    ];
  },
};