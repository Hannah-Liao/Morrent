import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
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
import console from 'console';

const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'First name should not be empty' })
    .max(50, { message: 'Not a valid first name' }),
  lastName: z
    .string()
    .nonempty({ message: 'Last name should not be empty' })
    .max(50, { message: 'Not a valid last name' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(18, { message: 'Password must be less than 18 characters' }),
  confirmPassword: z.string(), // need to add function to confirm password!
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signup, { isLoading: isSignUpLoading, error: signupError }] =
    useSignupMutation();

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                <Button
                  type='submit'
                  className='signInButton'
                  onClick={goToTop}
                >
                  {isSignUpLoading && (
                    <svg
                      aria-hidden='true'
                      role='status'
                      className='inline w-6 h-6 mr-3 text-white animate-spin'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='#E5E7EB'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentColor'
                      />
                    </svg>
                  )}
                  {isSignUpLoading ? 'Signing up...' : 'Signup'}
                </Button>
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
