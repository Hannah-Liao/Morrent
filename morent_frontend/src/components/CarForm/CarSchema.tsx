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
    .min(1, { message: 'Capacity must be at least 1' })
    .max(12, { message: 'Capacity must not greater than 12' }),

  transmissionType: z.string().min(1),
  carLocation: z
    .string()
    .trim()
    .min(2, { message: 'Location must have at least 2 characters' })
    .max(200, { message: 'Location must not be greater than 200' }),
  fuelTankSize: z.coerce
    .number()
    .min(10, { message: 'Fuel capacity must be at least 10' })
    .max(200, { message: 'Fuel capacity must not be greater than 200' }),
  description: z
    .string()
    .trim()
    .min(30, { message: 'Description must have at least 30 characters' })
    .max(300, { message: 'Description must not exceeds 300 characters' }),
});
