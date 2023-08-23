import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';
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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signInSchema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: 'Invalid email format',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(18, { message: 'Password must be less than 18 characters' }),
  rememberMe: z.boolean().optional(),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data);
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
                <Button type='submit' className='signInButton'>
                  Login
                </Button>
                <p className='mt-4 text-xs text-center text-gray-700 dark:text-white'>
                  {' '}
                  Don't have an account?
                  <span className='signUpLink'>
                    <NavLink to='/sign-up' className='navLink'>
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
