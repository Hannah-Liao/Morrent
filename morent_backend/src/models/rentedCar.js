import { Schema, model } from 'mongoose';

const rentedCarSchema = new Schema(
  {
    carId: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car Id is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    pickUpTime: {
      type: String,
      required: [true, 'Please add a pickup time'],
      validate: {
        validator: function (value) {
          let currentTime = Date.now();
          let currentHours = new Date(currentTime).getHours();
          let currentMinutes = new Date(currentTime).getMinutes();
          let [inputHours, inputMinutes] = value.split(':').map(Number);

          const isGreaterThanNow = inputHours > currentHours;
          return (
            isGreaterThanNow ||
            (inputHours === currentHours && inputMinutes > currentMinutes)
          );
        },
        message: 'Pick time must not be in the past.',
      },
    },
    dropOffTime: {
      type: String,
      required: [true, 'Please add a dropoff time'],
      validate: {
        validator: function (value) {
          let [inputHours, inputMinutes] = value.split(':').map(Number);
          let [hours, minutes] = this.pickUpTime.split(':').map(Number);
          const isGreaterThanPickUpTime =
            inputHours > hours ||
            (inputHours === hours && inputMinutes > minutes);
          return isGreaterThanPickUpTime;
        },
        message: 'Drop off time must be later than pickup time.',
      },
    },
    pickUpDate: {
      type: Date,
      required: [true, 'Please add a pickup date'],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const userDate = new Date(value);
          return userDate >= today;
        },
        message: 'Pickup date must be today or later.',
      },
    },

    dropOffDate: {
      type: Date,
      required: [true, 'Please add dropoff date'],
      validate: {
        validator: function (value) {
          const userInput = new Date(value);
          const userPickUpDate = new Date(this.pickUpDate);
          return userInput > userPickUpDate;
        },
        message: 'Dropoff date must be later than pickup date.',
      },
    },
  },
  { timestamps: true }
);

export default model('RentedCar', rentedCarSchema);
