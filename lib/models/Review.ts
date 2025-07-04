import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  reviewer: string; // User address
  prompt: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  reviewer: {
    type: String,
    required: true,
    lowercase: true
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
ReviewSchema.index({ reviewer: 1 });
ReviewSchema.index({ prompt: 1 });
ReviewSchema.index({ rating: -1 });
ReviewSchema.index({ createdAt: -1 });

// Compound index to prevent duplicate reviews
ReviewSchema.index({ reviewer: 1, prompt: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);