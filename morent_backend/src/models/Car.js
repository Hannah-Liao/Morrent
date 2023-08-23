import { Schema, model } from 'mongoose';

const carSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 30,
      maxLength: 300,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    fuelTankSize: {
      type: Number,
      required: true,
      min: 10,
      max: 200,
    },
    transmissionType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value % 1 === 0;
        },
        message: 'The field must be a whole number without decimals.',
      },
      min: 10,
      max: 3000,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value % 1 === 0;
        },
        message: 'The field must be a whole number without decimals.',
      },
      min: 8,
      max: 2500,
    },
    carLocation: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 200,
    },
    carImages: {
      required: true,
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0 && v.length < 4,
    },
    rentedDateFrom: {
      type: String,
      validate: {
        validator: function (value) {
          const startDate = new Date();
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
          return value >= startDate && value <= endDate;
        },
        message: 'The date must be between today and one month from today.',

        validator: function (value) {
          // Get the current date
          const now = new Date();
          // Set the current date to midnight (beginning of the day)
          now.setHours(0, 0, 0, 0);
          // Add 30 days to the current date
          const thirtyDaysFromNow = new Date(
            now.getTime() + 30 * 24 * 60 * 60 * 1000
          );
          // Return true if the given date is greater than or equal to thirtyDaysFromNow
          return value >= thirtyDaysFromNow;
        },
      },
    },

    rentedDateTo: {
      type: String,
      validate: {
        validator: function (value) {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() + 1);
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
          return value >= startDate && value <= endDate;
        },
        message: 'The date must be between today and one month from today.',
      },
    },
    isRented: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Car = model('Car', carSchema);
