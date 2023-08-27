import React from 'react';
import * as z from 'zod';

const userFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Must have 2 chars' })
    .max(50, { message: 'Max 50 chars allowed' }),

  lastName: z
    .string()
    .min(2, { message: 'Must have 2 chars' })
    .max(50, { message: 'Max 50 chars allowed' }),

  email: z.coerce
    .string()
    .email({ message: 'Write valid email' })
    .min(5, { message: 'Too small' }),

  phoneNumber: z.coerce.number().min(5).max(12),
  profileBanner: z.string(),
  profileImage: z.string(),
});

const AddUser = () => {
  return <div></div>;
};

export default AddUser;
