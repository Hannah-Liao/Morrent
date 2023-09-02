import { cars } from '../constant';

export type CarInfo = (typeof cars)[0];

type CarDataInfo = {
  _v: number;
  _id: string;
  capacity: number;
  carImages: string[];
  carLocation: string;
  carType: string;
  createdAt: string;
  description: string;
  discountPrice: number;
  fuelTankSize: number;
  price: number;
  title: string;
  updatedAt: string;
  transmissionType: string;
  user: string;
  rentedDateFrom: string;
  rentedDateTo: string;
};

export type CarData = {
  label: string;
  key: string;
};

export type CarFilterOptionsProps = {
  title: string;
  options: CarData[];
  value: string[];
};
