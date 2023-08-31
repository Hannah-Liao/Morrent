import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { addCarSchema } from './CarSchema';
import { uploadIcon, deleteIcon } from '../../assets/icons';
import {
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from '../../services/api';
import ImageDisplay from './ImageDisplay';

type CarFormProps = {
  isEditCarPage: boolean;
  carID: string | undefined;
  carData: {
    title: string;
    carType: string;
    price: number | null;
    capacity: number | null;
    transmissionType: string;
    carLocation: string;
    fuelTankSize: number | null;
    description: string;
    carImages: Array<string> | [];
  };
};

const CarForm: React.FC<CarFormProps> = ({ isEditCarPage, carID, carData }) => {
  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const navigate = useNavigate();

  const { userID } = useSelector((state) => {
    return state.authSlice;
  });

  console.log('here', userID);

  const [images, setImages] = useState<FormData | null>(null);
  const [existImages, setExistImages] = useState(
    carData ? [...carData?.carImages] : [],
  );
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const imageArr = files.map((file) => {
        return URL.createObjectURL(file);
      });

      !isEditCarPage &&
        setSelectedImages((previousImages) => previousImages.concat(imageArr));

      isEditCarPage &&
        setExistImages((previousImages) => previousImages.concat(imageArr));

      setImages(event.target.files);
    }
  };

  const form = useForm<z.infer<typeof addCarSchema>>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      title: carData?.title || '',
      carType: carData?.carType || '',
      price: carData?.price || '',
      capacity: carData?.capacity || '',
      transmissionType: carData?.transmissionType || '',
      carLocation: carData?.carLocation || '',
      fuelTankSize: carData?.fuelTankSize || '',
      description: carData?.description || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof addCarSchema>) => {
    const formData = new FormData();
    // @ts-ignore
    if (images) {
      Array.from(images).forEach((file) => {
        formData.append('photos', file);
      });
    }

    formData.append('title', data.title);
    formData.append('carType', data.carType);
    formData.append('price', data.price);
    formData.append('capacity', data.capacity);
    formData.append('transmissionType', data.transmissionType);
    formData.append('carLocation', data.carLocation);
    formData.append('fuelTankSize', data.fuelTankSize);
    formData.append('description', data.description);
    if (carData?.carImages?.length > 0) {
      formData.append('carImages', existImages);
    }

    if (!isEditCarPage) {
      addCar(formData);
    } else {
      updateCar({ car: formData, carID: carID });
    }
    navigate(`/profile/${userID}`);
  };

  return (
    <div className='w-full max-w-[852px] p-[24px] mx-auto dark:bg-gray-850 bg-white borderRadius-lg'>
      <p className='text-gray-900 base-bold pb-[10px] dark:text-white'>
        {isEditCarPage ? 'Edit Car Details' : 'Add a Car for Rent'}
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
              name='title'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='title' className='inputLabel'>
                    Car Title
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='Car title'
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
                  <label htmlFor='carType' className='inputLabel'>
                    Car Type
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='Brand name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='price' className='inputLabel'>
                    Rent Price
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='inputField'
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
                  <label htmlFor='capacity' className='inputLabel'>
                    Capacity
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='inputField'
                      placeholder='No. of people'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='transmissionType'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='transmissionType' className='inputLabel'>
                    Transmission
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='transmission type'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='carLocation'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='carLocation' className='inputLabel'>
                    Location
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
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
              name='fuelTankSize'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='fuelTankSize' className='inputLabel'>
                    Fuel Capacity
                  </label>
                  <FormControl>
                    <Input
                      type='number'
                      className='inputField'
                      placeholder='Fuel capacity in liters'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='description' className='inputLabel'>
                    Short Description
                  </label>
                  <FormControl>
                    <Input
                      className='inputField'
                      placeholder='Description ...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='w-full mb-[20px]'>
            <label htmlFor='uploadImg' className='inputLabel'>
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
                <input
                  onChange={handleImageUpload}
                  id='dropzone-file'
                  multiple
                  name='photos'
                  type='file'
                  className='hidden'
                />
              </label>
            </div>
          </div>

          <ImageDisplay
            existImages={existImages}
            setExistImages={setExistImages}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />

          <div className='flex flex-col-reverse sm:flex-row justify-end gap-5'>
            {isEditCarPage && (
              <Button
                type='button'
                className='gap-2 removeBtn p-bold py-4 rounded-[10px] focus:ring-4 focus:outline-none w-full md:w-auto'
                onClick={() => {
                  deleteCar(carID);
                  navigate('/');
                }}
              >
                <img src={deleteIcon} alt='deleteIcon' />
                Remove Car
              </Button>
            )}

            {selectedImages.length > 3 || existImages.length > 3 ? (
              <p className='text-red'>
                You can not upload more than 3 pictures
              </p>
            ) : (
              <Button
                type='submit'
                className='btn p-bold py-4 rounded-[10px] focus:ring-4 focus:outline-none focus:ring-blue-300 w-full md:w-auto dark:focus:ring-blue-300 lg:justify-end'
              >
                {isEditCarPage ? 'Edit Car' : 'Submit'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CarForm;
