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
import { toast } from '../components/ui/use-toast';
import { addCarSchema } from '../components/CarSchema';
import { uploadIcon } from '../assets/icons';

const AddCar = () => {
  const form = useForm<z.infer<typeof addCarSchema>>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      carTitle: '',
      carType: '',
      rentPrice: '',
      capacity: '',
      transmission: '',
      location: '',
      fuelCapacity: '',
      shortDesc: '',
    },
  });

  function onSubmit(data: z.infer<typeof addCarSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className='w-full max-w-[852px] p-[24px] mx-auto dark:bg-gray-850 bg-white borderRadius-lg'>
      <p className='text-gray-900 base-bold pb-[10px] dark:text-white'>
        Add a Car for Rent
      </p>
      <p className='text-gray-400 body-regular pb-[35px]'>
        Please enter your car info
      </p>
      <p className='heading-3-bold text-blue-500 pb-[35px] dark:text-blue-300'>
        CAR INFO
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-6 mb-6 md:grid-cols-2 pb-[45px]'>
            <FormField
              control={form.control}
              name='carTitle'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='carTitle' className='addCarFormLabel'>
                    Car Title
                  </label>
                  <FormControl>
                    <Input
                      className='addCarForm'
                      placeholder='Car Title'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='carType'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='carType' className='addCarFormLabel'>
                    Car Type
                  </label>
                  <FormControl>
                    <Input
                      className='addCarForm'
                      placeholder='Brand Name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='rentPrice'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='rentPrice' className='addCarFormLabel'>
                    Rent Price
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='addCarForm'
                      placeholder='Price in dollars'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='capacity' className='addCarFormLabel'>
                    Capacity
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='addCarForm'
                      placeholder='Capacity in person'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='transmission'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='transmission' className='addCarFormLabel'>
                    Transmission
                  </label>
                  <FormControl>
                    <Input
                      className='addCarForm'
                      placeholder='Car Type'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='location' className='addCarFormLabel'>
                    Location
                  </label>
                  <FormControl>
                    <Input
                      className='addCarForm'
                      placeholder='Select your city'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='fuelCapacity'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='fuelCapacity' className='addCarFormLabel'>
                    Fuel Capacity
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='addCarForm'
                      placeholder='Fuel Capicity in liters'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='shortDesc'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='shortDesc' className='addCarFormLabel'>
                    Short Description
                  </label>
                  <FormControl>
                    <Input
                      className='addCarForm'
                      placeholder='Fuel Capicity in liters'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full mb-[37px]'>
            <label htmlFor='uploadImg' className='addCarFormLabel'>
              Upload Image
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

export default AddCar;
