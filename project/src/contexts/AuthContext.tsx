import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, AuthState } from '../types';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Mock API call - replace with actual authentication
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        location: 'San Francisco, CA',
        skillsOffered: ['React', 'TypeScript'],
        skillsWanted: ['Node.js', 'Python'],
        availability: 'available',
        isPublic: true,
        rating: 4.8,
        totalSwaps: 15,
        joinedDate: '2023-01-15',
        lastActive: new Date().toISOString(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      localStorage.setItem('authToken', 'mock-token');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (userData: Partial<User> & { email: string; password: string }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Mock API call
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name || '',
        location: userData.location || '',
        skillsOffered: userData.skillsOffered || [],
        skillsWanted: userData.skillsWanted || [],
        availability: 'available',
        isPublic: true,
        rating: 0,
        totalSwaps: 0,
        joinedDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      localStorage.setItem('authToken', 'mock-token');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};