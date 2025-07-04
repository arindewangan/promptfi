import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
  buyer: string; // User address
  seller: string; // User address
  prompt: mongoose.Types.ObjectId;
  amount: number;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>({
  buyer: {
    type: String,
    required: true,
    lowercase: true
  },
  seller: {
    type: String,
    required: true,
    lowercase: true
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
PurchaseSchema.index({ buyer: 1 });
PurchaseSchema.index({ seller: 1 });
PurchaseSchema.index({ prompt: 1 });
PurchaseSchema.index({ createdAt: -1 });

export default mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);