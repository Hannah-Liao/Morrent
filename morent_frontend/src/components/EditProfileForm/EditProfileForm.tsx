import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { uploadIcon, close } from '../../assets/icons';
import { useUpdateUserMutation } from '../../services/api';

type EditProfileProps = {
  userData: {
    address: string;
    phoneNumber: string;
    name: string;
    profileImage: string;
  };
};

const formSchema = z.object({
  firstName: z.string({
    required_error: 'name is required',
  }),
  lastName: z.string({
    required_error: 'name is required',
  }),
  phoneNumber: z.string({
    required_error: 'phone number is required',
  }),
  address: z.string(),
});

const EditProfileForm: React.FC<EditProfileProps> = ({ userData }) => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  // images to send to the database
  const [image, setImage] = useState([]);

  const [displayImage, setDisplayImage] = useState<
    Array<{ url: string; file: File | null }>
  >([{ url: userData.profileImage, file: null }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userData.name.split(' ')[0],
      lastName: userData.name.split(' ')[1],
      address: userData.address,
      phoneNumber: userData.phoneNumber,
    },
  });

  const { userID } = useSelector((state) => {
    return state.authSlice;
  });
  console.log('here', userID);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      files.map((file) =>
        setDisplayImage([{ url: URL.createObjectURL(file), file: file }]),
      );

      setImage(event.target.files);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    // @ts-ignore
    if (image) {
      Array.from(image).forEach((file) => {
        formData.append('photos', file);
      });
    }

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('address', data.address);
    if (userData?.profileImage) {
      formData.append('profileImage', userData.profileImage);
    }

    updateUser(formData);
    navigate('/profile');
  };

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
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <label htmlFor='phoneNumber' className='inputLabel'>
                    Phone Number
                  </label>
                  <FormControl>
                    <Input
                      type='text'
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

          <div className='w-full mb-4'>
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
                <input
                  id='dropzone-file'
                  type='file'
                  className='hidden'
                  name='photos'
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className='flex gap-3 mb-3'>
            {displayImage.map((image, i) => (
              <div key={i} className='relative '>
                <img
                  src={image.url}
                  alt='profile images'
                  className='w-24 h-24 rounded-md'
                />
                <button
                  type='button'
                  className='absolute top-[-5px] right-[-5px] border-white-200  border-2 rounded-full bg-white-100'
                  onClick={() => {
                    setDisplayImage(
                      displayImage.filter((e) => e.url !== image.url),
                    );
                    setImage(image.filter((e) => e.name !== image.file.name));
                  }}
                >
                  <img
                    src={close}
                    alt='delete image icon'
                    className='p-[2px]'
                  />
                </button>
              </div>
            ))}
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

export default EditProfileForm;
