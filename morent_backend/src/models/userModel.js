import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    unique: true,
    maxLength: 100,
  },
  phoneNumber: {
    type: Number,
    required: true,
    maxLength: 12,
  },
  profileImage: {
    type: String,
    required: true,
  },
  profileBanner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    maxLength: 200,
  },
  favCars: {
    type: Array,
    required: true,
    carId: [Schema.Types.Mixed],
  },
  rentedCars: {
    type: Array,
    required: true,
    carId: [Schema.Types.Mixed],
  },

  accessToken: {
    type: [Schema.Types.Mixed],
  },
  refreshToken: {
    type: [Schema.Types.Mixed],
  },
});

export const UserModel = mongoose.model('User', userSchema);
