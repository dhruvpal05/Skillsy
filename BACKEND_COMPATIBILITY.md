# Backend-Frontend Compatibility Changes

## Overview
The backend has been updated to be compatible with the frontend's expected API structure and data models.

## Key Changes Made

### 1. Data Model Updates

#### User Model (`backend/src/modules/user/user.model.js`)
- **skillsOffered/skillsWanted**: Changed from `ObjectId[]` to `String[]`
- **availability**: Changed from `String[]` to single `String` with enum values
- **Added fields**: `rating`, `totalSwaps`, `lastActive`
- **Added virtual**: `joinedDate` for frontend compatibility

#### SwapRequest Model (`backend/src/modules/swap/swap.model.js`)
- **Field name changes**:
  - `requester` → `requesterId`
  - `recipient` → `targetUserId`
  - `skillOffered` → `offeredSkill`
  - `skillRequested` → `requestedSkill`
- **Type changes**: All skill references changed from `ObjectId` to `String`
- **Added field**: `completedAt` for frontend compatibility
- **Added virtual**: `id` field for frontend expectations

#### Feedback Model (`backend/src/modules/feedback/feedback.model.js`)
- **Field name changes**:
  - `swapRequest` → `swapId`
  - `fromUser` → `fromUserId`
  - `toUser` → `toUserId`
- **Type changes**: All references changed from `ObjectId` to `String`
- **Added virtual**: `id` field for frontend expectations

### 2. API Endpoint Updates

#### User Routes (`backend/src/modules/user/user.routes.js`)
- **Added endpoints**:
  - `GET /api/users/search` - Search users with filters
  - `GET /api/users/:id` - Get user by ID
  - `GET /api/users/:id/feedback` - Get user feedback
- **Auth routes**: Added `/api/auth/*` routes for frontend compatibility

#### Swap Routes (`backend/src/modules/swap/swap.routes.js`)
- **Added endpoints**:
  - `POST /api/swaps/create` - Create swap request
  - `PUT /api/swaps/update` - Update swap request
  - `GET /api/swaps/user` - Get user's swap requests
  - `GET /api/swaps/all` - Get all swap requests (admin)
  - `DELETE /api/swaps/delete` - Delete swap request

### 3. Service Layer Updates

#### User Service (`backend/src/modules/user/user.service.js`)
- **Added functions**:
  - `searchUsersService()` - Search with filters and pagination
  - `getUserByIdService()` - Get user by ID
  - `getUserFeedbackService()` - Get user feedback
- **Updated**: `updateUserProfileService()` to handle new fields

#### Swap Service (`backend/src/modules/swap/swap.service.js`)
- **Added functions**:
  - `updateSwapRequestById()` - Update swap request
- **Updated**: All functions to work with new field names
- **Removed**: Population queries (no longer needed with string references)

### 4. Validation Updates

#### Swap Validation (`backend/src/modules/swap/swap.validation.js`)
- **Updated field names**:
  - `recipient` → `targetUserId`
  - `skillOffered` → `offeredSkill`
  - `skillRequested` → `requestedSkill`
- **Added status**: `completed` and `cancelled` to valid statuses

### 5. Dependencies

#### Package.json Updates
- **Added**: `express-validator` for validation middleware

### 6. Frontend Integration

#### API Client (`frontend/src/services/api.ts`)
- **Created**: New API client for making HTTP requests
- **Features**:
  - Automatic token handling
  - Error handling
  - Type-safe responses
  - All frontend-expected endpoints

## API Response Format

All endpoints now return responses in the format expected by the frontend:

```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

## Environment Variables

The frontend expects these environment variables:
- `VITE_API_BASE_URL` (defaults to `http://localhost:5000/api`)

## Migration Notes

1. **Database Migration**: Existing data will need to be migrated to match new schema
2. **Authentication**: JWT tokens are now properly handled
3. **CORS**: Backend is configured to accept requests from frontend
4. **Validation**: All endpoints now have proper validation

## Testing

To test the compatibility:

1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm run dev`
3. The frontend should now be able to make real API calls instead of using mock data

## Next Steps

1. Update frontend services to use the new API client
2. Add proper error handling in frontend
3. Implement loading states
4. Add proper TypeScript types for API responses 