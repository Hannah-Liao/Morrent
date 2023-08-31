import { ZodType, z } from 'zod';

// create car schema
export const addCarSchema: ZodType = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Car title must have at least 3 characters' }),
  carType: z
    .string()
    .trim()
    .min(3, { message: 'Car type must have at least 3 characters' }),
  price: z.coerce
    .number()
    .min(10, { message: 'Rent price must be more than 10 USD' }),
  capacity: z.coerce
    .number()
    .min(1, { message: 'Capacity must be at least 1' }),

  transmissionType: z.string().min(1),
  carLocation: z
    .string()
    .trim()
    .min(2, { message: 'Location must have at least 2 characters' }),
  fuelTankSize: z.coerce
    .number()
    .min(1, { message: 'Fuel capacity must be at least 1' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description must have at least 30 characters' }),
});
