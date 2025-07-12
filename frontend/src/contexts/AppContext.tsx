import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SwapRequest, Feedback, Announcement } from '../types';

interface AppState {
  swapRequests: SwapRequest[];
  feedback: Feedback[];
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SWAP_REQUESTS'; payload: SwapRequest[] }
  | { type: 'ADD_SWAP_REQUEST'; payload: SwapRequest }
  | { type: 'UPDATE_SWAP_REQUEST'; payload: SwapRequest }
  | { type: 'SET_FEEDBACK'; payload: Feedback[] }
  | { type: 'ADD_FEEDBACK'; payload: Feedback }
  | { type: 'SET_ANNOUNCEMENTS'; payload: Announcement[] };

interface AppContextType extends AppState {
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => Promise<void>;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => Promise<void>;
  loadUserSwapRequests: (userId: string) => Promise<void>;
  loadFeedback: (userId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SWAP_REQUESTS':
      return { ...state, swapRequests: action.payload };
    case 'ADD_SWAP_REQUEST':
      return { ...state, swapRequests: [...state.swapRequests, action.payload] };
    case 'UPDATE_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: state.swapRequests.map(req =>
          req.id === action.payload.id ? action.payload : req
        ),
      };
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.payload };
    case 'ADD_FEEDBACK':
      return { ...state, feedback: [...state.feedback, action.payload] };
    case 'SET_ANNOUNCEMENTS':
      return { ...state, announcements: action.payload };
    default:
      return state;
  }
};

const initialState: AppState = {
  swapRequests: [],
  feedback: [],
  announcements: [],
  isLoading: false,
  error: null,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const createSwapRequest = async (requestData: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newRequest: SwapRequest = {
        ...requestData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'ADD_SWAP_REQUEST', payload: newRequest });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create swap request' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateSwapRequest = async (id: string, updates: Partial<SwapRequest>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const existingRequest = state.swapRequests.find(req => req.id === id);
      if (!existingRequest) throw new Error('Request not found');
      
      const updatedRequest: SwapRequest = {
        ...existingRequest,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'UPDATE_SWAP_REQUEST', payload: updatedRequest });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update swap request' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addFeedback = async (feedbackData: Omit<Feedback, 'id' | 'createdAt'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newFeedback: Feedback = {
        ...feedbackData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'ADD_FEEDBACK', payload: newFeedback });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add feedback' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadUserSwapRequests = async (userId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call - replace with actual API
      const mockRequests: SwapRequest[] = [
        {
          id: '1',
          requesterId: userId,
          targetUserId: '2',
          offeredSkill: 'React',
          requestedSkill: 'Node.js',
          message: 'Would love to learn Node.js in exchange for React knowledge!',
          status: 'pending',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'SET_SWAP_REQUESTS', payload: mockRequests });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load swap requests' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadFeedback = async (userId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call
      const mockFeedback: Feedback[] = [
        {
          id: '1',
          swapId: '1',
          fromUserId: '2',
          toUserId: userId,
          rating: 5,
          comment: 'Excellent teacher! Very patient and knowledgeable.',
          createdAt: '2024-01-10T10:00:00Z',
        },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'SET_FEEDBACK', payload: mockFeedback });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load feedback' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AppContext.Provider value={{
      ...state,
      createSwapRequest,
      updateSwapRequest,
      addFeedback,
      loadUserSwapRequests,
      loadFeedback,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};