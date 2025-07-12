/**
 * Application constants and configuration
 */

export const APP_NAME = 'SkillSwap';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  BROWSE: '/browse',
  SWAPS: '/swaps',
  SETTINGS: '/settings',
  ADMIN: '/admin',
} as const;

export const SKILL_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Design',
  'Marketing',
  'Business',
  'Languages',
  'Music',
  'Art',
  'Writing',
  'Photography',
  'Cooking',
  'Fitness',
  'Other',
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: 'available', label: 'Available', color: '#10b981' },
  { value: 'busy', label: 'Busy', color: '#f59e0b' },
  { value: 'offline', label: 'Offline', color: '#ef4444' },
] as const;

export const SWAP_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'accepted', label: 'Accepted', color: '#10b981' },
  { value: 'rejected', label: 'Rejected', color: '#ef4444' },
  { value: 'completed', label: 'Completed', color: '#3b82f6' },
  { value: 'cancelled', label: 'Cancelled', color: '#6b7280' },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    SEARCH: '/users/search',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    FEEDBACK: '/users/feedback',
  },
  SWAPS: {
    CREATE: '/swaps/create',
    UPDATE: '/swaps/update',
    USER: '/swaps/user',
    ALL: '/swaps/all',
    DELETE: '/swaps/delete',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  SKILL_MAX_LENGTH: 30,
  MESSAGE_MAX_LENGTH: 500,
} as const;