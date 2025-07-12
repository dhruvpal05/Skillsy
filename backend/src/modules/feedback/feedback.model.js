import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  swapId: { type: String, required: true }, // Changed from ObjectId to String
  fromUserId: { type: String, required: true }, // Changed from ObjectId to String
  toUserId: { type: String, required: true }, // Changed from ObjectId to String
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

// Virtual for id field to match frontend expectations
feedbackSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtuals are serialized
feedbackSchema.set('toJSON', { virtuals: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
