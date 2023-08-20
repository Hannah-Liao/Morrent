import { cars } from '../constant';

export type CarInfo = (typeof cars)[0];
export type CarData = {
  label: string;
  key: string;
};

export type CarFilterOptionsProps = {
  title: string;
  options: CarData[];
  value: string;
};