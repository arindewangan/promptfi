import mongoose, { Schema, Document } from 'mongoose';

export interface IPrompt extends Document {
  title: string;
  description: string;
  content: string;
  preview: string;
  sampleOutput: string;
  category: string;
  type: string;
  price: number;
  creator: string; // User address
  stats: {
    hearts: number;
    views: number;
    purchases: number;
    rating: number;
    reviews: number;
  };
  tags: string[];
  trending: boolean;
  featured: boolean;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const PromptSchema = new Schema<IPrompt>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  preview: {
    type: String,
    required: true,
    maxlength: 500
  },
  sampleOutput: {
    type: String,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['chatgpt', 'claude', 'gemini', 'midjourney', 'dalle', 'stable-diffusion', 'code', 'custom']
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000
  },
  creator: {
    type: String,
    required: true,
    lowercase: true
  },
  stats: {
    hearts: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }
  },
  tags: [String],
  trending: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes
PromptSchema.index({ creator: 1 });
PromptSchema.index({ category: 1 });
PromptSchema.index({ type: 1 });
PromptSchema.index({ trending: 1 });
PromptSchema.index({ 'stats.rating': -1 });
PromptSchema.index({ 'stats.purchases': -1 });
PromptSchema.index({ createdAt: -1 });
PromptSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Prompt || mongoose.model<IPrompt>('Prompt', PromptSchema);