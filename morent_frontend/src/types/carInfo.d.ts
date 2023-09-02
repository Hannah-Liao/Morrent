export type CarData = {
  label: string;
  key: string;
};

export type CarFilterOptionsProps = {
  title: string;
  options: CarData[];
  value: string[];
  value: string;
};

export type CarDataInfo = {
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
  isFavorited?: boolean;
  rentedDateFrom: string;
  rentedDateTo: string;
  rating: number;
  reviews: number;
};
