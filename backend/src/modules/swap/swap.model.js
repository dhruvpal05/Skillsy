import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offeredSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  requestedSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  completedAt: { type: Date }, // Added for frontend compatibility
}, { timestamps: true });

// Virtual for id field to match frontend expectations
swapRequestSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtuals are serialized
swapRequestSchema.set('toJSON', { virtuals: true });

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
export default SwapRequest;
