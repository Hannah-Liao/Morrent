import { z } from 'zod';

// create car schema
export const addCarSchema = z.object({
  carTitle: z.string().trim().min(3, { message: 'Car Title Must have 3 char' }),
  carType: z.string().trim().min(1),
  rentPrice: z.number().min(10, { message: 'Must be more than 10USD8' }),
  capacity: z.number().min(1, { message: 'Min 1 char required' }),
  transmisson: z.string().min(1),
  location: z
    .string()
    .trim()
    .min(10, { message: 'must have at least 10 char' }),
  fuelCapacity: z.number().min(1, { message: 'Min 1 char required' }),
  shortDesc: z.string().trim().min(10, { message: 'Desc must have 10 chars' }),
  image: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: 'The profile picture must be a maximum of 10MB.',
    })
    .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
      message: 'Only images are allowed to be sent.',
    }),
});
