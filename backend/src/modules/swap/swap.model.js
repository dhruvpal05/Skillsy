import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  skillRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  message: { type: String },
}, { timestamps: true });

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
export default SwapRequest;
