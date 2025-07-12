import { registerUserService, loginUserService, updateUserProfileService, getUserProfileService } from './user.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const registerUser = async (req, res) => {
  try {
    const { user, token } = await registerUserService(req.body);
    return successResponse(res, { user, token }, "User registered successfully", 201);
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);
    return successResponse(res, { user, token }, "Login successful");
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

export const getCurrentUserProfile = async (req, res) => {
  try {
    // req.user is attached by the auth middleware
    const user = await getUserProfileService(req.user.id);
    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, error, 404);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await updateUserProfileService(req.user.id, req.body);
    return successResponse(res, updatedUser, "Profile updated successfully");
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

// Logout is typically handled client-side by deleting the JWT.
// A server-side implementation could involve token blocklisting if needed.
export const logoutUser = (req, res) => {
  successResponse(res, null, "Logout successful. Please clear token on client-side.");
};
