import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';

import { Input } from '../ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { useSignupMutation } from '../../services/api';
import { isApiResponse } from '../../lib/utils';
import { ButtonWithSpinner } from '../../components/index';

const signUpSchema = z
  .object({
    firstName: z.string().max(50, { message: 'Not a valid first name' }),
    lastName: z.string().max(50, { message: 'Not a valid last name' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(18, { message: 'Password must be less than 18 characters' }),

    confirmPassword: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(18, { message: 'Password must be less than 18 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signup, { isLoading: isSignUpLoading, error: signupError }] =
    useSignupMutation();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      await signup(data)
        .unwrap()
        .then((res) => {
          if (res.success) {
            navigate('/login');
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='relative flex flex-col justify-center items-center my-[40px] overflow-hidden'>
      <div className='signInCard'>
        <Card className='dark:bg-gray-850'>
          {/* Form Header */}
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center mb-[10px]'>
              Signup
            </CardTitle>
            <CardDescription className='text-center text-gray-400'>
              Add your details to signup
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <CardContent className='grid gap-4 pb-0'>
                {/* Name Input*/}
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='grid gap-2 mb-[10px]'>
                      <FormLabel
                        htmlFor='firstName'
                        className='signInInputLabel'
                      >
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='firstName'
                          type='text'
                          placeholder='Enter your first name'
                          className='inputField dark:bg-gray-800'
                        />
                      </FormControl>
                      <FormMessage className='formMessage' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='grid gap-2 mb-[10px]'>
                      <FormLabel
                        htmlFor='lastName'
                        className='signInInputLabel'
                      >
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='lastName'
                          type='text'
                          placeholder='Enter your last name'
                          className='inputField dark:bg-gray-800'
                        />
                      </FormControl>
                      <FormMessage className='formMessage' />
                    </FormItem>
                  )}
                />

                {/* Email Input*/}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2 mb-[10px]'>
                      <FormLabel htmlFor='email' className='signInInputLabel'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='email'
                          type='email'
                          placeholder='Enter your email address'
                          className='inputField dark:bg-gray-800'
                        />
                      </FormControl>
                      <FormMessage className='formMessage' />
                    </FormItem>
                  )}
                />

                {/* Password Input*/}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2 mb-[10px]'>
                      <FormLabel
                        htmlFor='password'
                        className='signInInputLabel'
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='password'
                          type='password'
                          placeholder='Enter your password'
                          className='inputField'
                        />
                      </FormControl>
                      <FormMessage className='formMessage' />
                    </FormItem>
                  )}
                />

                {/* Repeat Password Input*/}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='grid gap-2 mb-[10px]'>
                      <FormLabel
                        htmlFor='confirmPassword'
                        className='signInInputLabel'
                      >
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id='confirmPassword'
                          type='password'
                          placeholder='Confirm your password'
                          className='inputField'
                        />
                      </FormControl>
                      <FormMessage className='formMessage' />
                    </FormItem>
                  )}
                />
              </CardContent>

              {/* Button */}
              <CardFooter className='flex flex-col'>
                <ButtonWithSpinner
                  isLoading={isSignUpLoading}
                  loadingText='Signing up...'
                  text='Signup'
                />
                {isApiResponse(signupError) && (
                  <p className='text-sm text-red mt-4'>
                    {signupError.data.message}
                  </p>
                )}
                <p className='mt-4 text-xs text-center text-gray-700 dark:text-white'>
                  Already have an account?
                  <span className='signUpLink'>
                    <NavLink to='/login' className='navLink'>
                      Login
                    </NavLink>
                  </span>
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
