import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { uploadIcon } from '../assets/icons';

const formSchema = z.object({
  firstName: z.string({
    required_error: 'name is required',
  }),
  lastName: z.string({
    required_error: 'name is required',
  }),
  role: z.string({
    required_error: 'role is required',
  }),
  email: z.string({
    required_error: 'email is required',
  }),
  photoNumber: z.number({
    required_error: 'photo number is required',
  }),
  address: z.string(),
});

const EditProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <div className='w-full max-w-[600px] p-6 mx-auto dark:bg-gray-850 bg-white borderRadius-lg rounded-lg'>
      <h1 className='text-gray-900 base-bold pb-[10px] dark:text-white'>
        Edit profile
      </h1>
      <h5 className='text-gray-400 body-regular pb-[35px]'>
        Please enter your info
      </h5>
      <h2 className='heading-3-bold text-blue-500 pb-[35px] dark:text-blue-300'>
        INFO
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col flex-wrap pb-11'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='firstName' className='inputLabel'>
                    First Name
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='First name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='lastName' className='inputLabel'>
                    Last Name
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='Last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='role' className='inputLabel'>
                    User Role
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='Agent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='email' className='inputLabel'>
                    Email
                  </label>
                  <FormControl>
                    <Input
                      type='email'
                      className='inputField'
                      placeholder='Your email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='photoNumber'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='photoNumber' className='inputLabel'>
                    Phone Number
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='inputField'
                      placeholder='Phone number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='address' className='inputLabel'>
                    Address
                  </label>
                  <FormControl>
                    <Input
                      type='text'
                      className='inputField'
                      placeholder='Address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full mb-[37px]'>
            <label htmlFor='uploadImg' className='inputLabel'>
              Upload Profile Photo
            </label>

            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-44 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <img src={uploadIcon} alt='uploadIcon' />

                  <p className='mb-2 text-sm text-gray-700 body-regular dark:text-gray-400'>
                    Drag and drop image or
                    <span className='font-semibold text-blue-500'> Browse</span>
                  </p>
                  <p className='body-regular  text-gray-400 dark:text-gray-400'>
                    High resolution images (png, jpg, gif)
                  </p>
                </div>
                <input id='dropzone-file' type='file' className='hidden' />
              </label>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='text-white p-bold px-[20px] py-[16px] rounded-[10px] bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300   w-full md:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-300 lg:justify-end'
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
