import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useLoginMutation } from '../../services/api';
import { updateLogin } from '../../slice/loginSlice';
import { isApiResponse } from '../../lib/utils';
import { ButtonWithSpinner } from '../../components/index';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(18, { message: 'Password must be less than 18 characters' }),
  rememberMe: z.boolean().optional(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      await login(data)
        .unwrap()
        .then((userInfo) => {
          if (userInfo.success) {
            //store in redux
            dispatch(
              updateLogin({
                isLoggedIn: userInfo.success,
                userId: userInfo.userId,
              }),
            );
            navigate(`/profile`);
            window.location.reload();
          }
        });
    } catch (err) {
      console.log(err);

      console.error('Something went wrong!');
    }
  }

  return (
    <div className='relative flex flex-col justify-center items-center my-[40px] overflow-hidden'>
      <div className='signInCard'>
        <Card className='dark:bg-gray-850'>
          {/* Form Header */}
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center mb-[10px]'>
              Login
            </CardTitle>
            <CardDescription className='text-center text-gray-400'>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <CardContent className='grid gap-4 pb-0'>
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

                {/* 'Remember Me' checkbox */}
                <div className='flex items-center space-x-2'>
                  <Checkbox id='rememberMe' {...form.register('rememberMe')} />
                  <label htmlFor='rememberMe' className='rememberMeLabel'>
                    Remember me
                  </label>
                </div>
              </CardContent>

              {/* Button */}
              <CardFooter className='flex flex-col'>
                <ButtonWithSpinner
                  isLoading={isLoginLoading}
                  loadingText='Logging in...'
                  text='Login'
                />
                {isApiResponse(loginError) && (
                  <p className='text-sm text-red mt-4'>
                    {loginError.data.message}
                  </p>
                )}
                <p className='mt-4 text-xs text-center text-gray-700 dark:text-white'>
                  Don&apos;t have an account?
                  <span className='signUpLink'>
                    <NavLink to='/signup' className='navLink'>
                      Sign up
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

export default LoginForm;
