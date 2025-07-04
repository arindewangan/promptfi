import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  reputation: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinedDate: Date;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  stats: {
    followers: number;
    following: number;
    prompts: number;
    totalEarnings: number;
    avgRating: number;
    totalViews: number;
    totalPurchases: number;
  };
  achievements: Array<{
    type: string;
    earnedAt: Date;
    description: string;
  }>;
  categories: string[];
  followers: string[]; // Array of user addresses
  following: string[]; // Array of user addresses
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  avatar: {
    type: String,
    default: ''
  },
  reputation: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  location: String,
  website: String,
  twitter: String,
  github: String,
  stats: {
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    prompts: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 }
  },
  achievements: [{
    type: {
      type: String,
      required: true
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  categories: [String],
  followers: [String],
  following: [String]
}, {
  timestamps: true
});

// Indexes
// UserSchema.index({ address: 1 }); // Removed duplicate
UserSchema.index({ 'stats.totalEarnings': -1 });
UserSchema.index({ 'stats.prompts': -1 });
UserSchema.index({ reputation: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);