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
      //   validate: {
      //     validator: function (value) {
      //       let currentTime = new Date();
      //       let currentHours = currentTime.getHours();
      //       let currentMinutes = currentTime.getMinutes();
      //       let [inputHours, inputMinutes] = value.split(':').map(Number);
      //       const isGreaterThanNow =
      //         inputHours > currentHours ||
      //         (inputHours === currentHours && inputMinutes > currentMinutes);
      //       return isGreaterThanNow;
      //     },
      //   },
    },
    dropOffTime: {
      type: String,
      required: [true, 'Please add a dropoff time'],
      //   validate: {
      //     validator: function (value) {
      //       let [inputHours, inputMinutes] = value.split(':').map(Number);
      //       let [hours, minutes] = this.pickUpTime.split(':').map(Number);
      //       const isGreaterThanPickUpTime =
      //         inputHours > hours ||
      //         (inputHours === hours && inputMinutes > minutes);
      //       return isGreaterThanPickUpTime;
      //     },
      //   },
    },
    pickUpDate: {
      type: Date,
      required: [true, 'Please add a pickup date'],
      validate: {
        validator: function (value) {
          //   var today = new Date();
          //   var userDate = new Date(Date.parse(value));
          //   return userDate < today;
          //   const today = new Date();
          //   const todayInMs = new Date(today).getTime();
          //   const valueInMs = new Date(value).getTime();
          //   return valueInMs >= todayInMs;
        },
      },
    },
    dropOffDate: {
      type: Date,
      required: [true, 'Please add dropoff date'],
      //   validate: {
      //     validator: function (value) {
      //       const userInput = new Date(value).getDate();
      //       const userPickUpDate = new Date(this.pickUpdate).getDate();
      //       return userInput > userPickUpDate;
      //     },
      //   },
    },
  },
  { timestamps: true }
);

export default model('RentedCar', rentedCarSchema);
