import { User } from '@/types/user.types';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model<User>('User', userSchema);
