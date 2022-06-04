import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('user', userSchema);
