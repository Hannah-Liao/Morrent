import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeCarType(typeOfCar: string) {
  return typeOfCar.charAt(0).toUpperCase() + typeOfCar.slice(1).toLowerCase();
}
