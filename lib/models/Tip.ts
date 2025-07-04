import mongoose, { Schema, Document } from 'mongoose';

export interface ITip extends Document {
  from: string; // User address
  to: string; // User address
  prompt?: mongoose.Types.ObjectId;
  amount: number;
  message?: string;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const TipSchema = new Schema<ITip>({
  from: {
    type: String,
    required: true,
    lowercase: true
  },
  to: {
    type: String,
    required: true,
    lowercase: true
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  message: {
    type: String,
    maxlength: 500
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
TipSchema.index({ from: 1 });
TipSchema.index({ to: 1 });
TipSchema.index({ prompt: 1 });
TipSchema.index({ createdAt: -1 });

export default mongoose.models.Tip || mongoose.model<ITip>('Tip', TipSchema);