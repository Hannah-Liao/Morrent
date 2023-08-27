import { ZodType, z } from 'zod';

// create car schema
export const addCarSchema: ZodType = z.object({
  carTitle: z
    .string()
    .trim()
    .min(3, { message: 'Car Title must have at least 3 characters' }),
  carType: z
    .string()
    .trim()
    .min(3, { message: 'Car Type must have at least 3 characters' }),
  rentPrice: z.coerce
    .number()
    .min(10, { message: 'Rent Price must be more than 10 USD' }),
  capacity: z.coerce
    .number()
    .min(1, { message: 'Capacity must be at least 1' }),

  transmission: z.string().min(1),
  location: z.string(),
  fuelCapacity: z.coerce
    .number()
    .min(1, { message: 'Fuel Capacity must be at least 1' }),
  shortDesc: z
    .string()
    .trim()
    .min(10, { message: 'Description must have at least 10 characters' }),
});

// image: z
//   .custom<FileList>()
//   .transform((file) => file.length > 0 && file.item(0))
//   .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
//     message: 'The profile picture must be a maximum of 10MB.',
//   })
//   .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
//     message: 'Only images are allowed to be sent.',
//   }),
