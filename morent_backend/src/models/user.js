import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      maxLength: 12,
    },
    profileImage: {
      type: String,
    },
    profileBanner: {
      type: String,
    },
    location: {
      type: String,
      maxLength: 200,
    },
    favCars: {
      type: Array,
      carId: [Schema.Types.Mixed],
    },
    rentedCars: {
      type: Array,
      carId: [Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

export default model('User', userSchema);
