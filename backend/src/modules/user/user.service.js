import User from './user.model.js';
import jwt from 'jsonwebtoken';

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


export const registerUserService = async (userData) => {
  // Expect userData.password, hash it and store as passwordHash
  const { password, ...rest } = userData;
  if (!password) throw new Error('Password is required');
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.default.genSalt(10);
  const passwordHash = await bcrypt.default.hash(password, salt);
  const user = await User.create({ ...rest, passwordHash });
  const token = generateToken(user._id);
  return { user, token };
};


export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user._id);
    return { user, token };
  }
  throw new Error('Invalid email or password');
};

export const updateUserProfileService = async (userId, updateData) => {
  // Ensure sensitive data like password is not updated here
  const allowedUpdates = { name: updateData.name, location: updateData.location, availability: updateData.availability, isPublic: updateData.isPublic };
  return await User.findByIdAndUpdate(userId, allowedUpdates, { new: true });
};

export const getUserProfileService = async (userId) => {
  return await User.findById(userId);
};
