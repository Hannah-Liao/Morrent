import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { frame } from '../assets/icons';
import { Button } from '../components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { icons } from '../constant';

const formSchema = z.object({
  email: z.string().email().min(4, {
    message: 'Username can not empty and must be at least 4 characters.',
  }),
  name: z.string().min(4, {
    message: 'Name can not empty and must be at least 4 characters.',
  }),
  cardNumber: z.string().max(16).regex(/[0-9]/).min(16, {
    message: 'Your credit card number is not valid',
  }),

  expires: z.object({
    expireDate: z.string(),
    expireYear: z.string(),
  }),
  cvc: z.string(),
});

export default function Checkout() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      cardNumber: '',
      expires: {
        expireDate: '01',
        expireYear: '27',
      },
      cvc: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const SERVER_URL = process.env.VITE_SERVER_URL;
      const res = await fetch(`${SERVER_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          price: 2000000,
          carName: 'Mercedez benz',
          ...data,
        }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  function creditCardFormat(value: string) {
    const v = value.replace(/\s+/g, '').replace(/\D/gi, '').slice(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.slice(0, 4));
    }

    return parts.length > 1 ? parts.join(' ') : value;
  }

  return (
    <div className='w-ful l h-full flex-col'>
      <div className='space-y-8 w-full max-w-[540px] mx-auto bg-white dark:bg-gray-850 p-7 sm:p-[60px] rounded-lg '>
        <h1 className='text-left text-blue-500 text-lg font-extrabold pt-5'>
          Card details
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold text-gray-870 dark:text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      title='Your active email address'
                      placeholder='Your Email'
                      value={creditCardFormat(field.value)}
                      onChange={field.onChange}
                      className='bg-white-200 dark:bg-gray-800 dark:text-white focus:!ring-0'
                    />
                  </FormControl>
                  <FormMessage className='text-xs font-normal' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold text-gray-870 dark:text-white'>
                    Name on Card
                  </FormLabel>
                  <FormControl>
                    <Input
                      title='Name in your card'
                      placeholder='Full Name on your Card'
                      {...field}
                      className='bg-white-200 dark:bg-gray-800 dark:text-white focus:!ring-0'
                    />
                  </FormControl>
                  <FormMessage className='text-xs font-normal' />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem className='space-y-0 relative'>
                    <FormLabel className='text-sm font-semibold text-gray-900 dark:text-white'>
                      Country or region
                    </FormLabel>
                    <FormControl className='bg-white-200 dark:bg-gray-800 relative'>
                      <Input
                        title='Your card number'
                        placeholder={creditCardFormat('1122345647658898')}
                        className='focus:!ring-0 dark:text-white'
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute top-9 right-3  gap-3 hidden sm:flex'>
                      {icons.map((icon) => (
                        <img
                          src={icon.icon}
                          alt={icon.label}
                          key={icon.label}
                        />
                      ))}
                    </div>
                    <FormMessage className='text-xs font-normal' />
                  </FormItem>
                )}
              />
              <div className='flex items-center w-full mt-0 '>
                <FormField
                  control={form.control}
                  name='expires'
                  render={({ field }) => (
                    <FormItem className='bg-white-200 dark:bg-gray-800 flex mx-0 mt-0 space-y-0 gap-0 border  rounded-md w-full'>
                      <FormControl>
                        <Input
                          title='Expire month and year of your card'
                          placeholder='MM/YY'
                          defaultValue={`${field.value.expireDate}/${field.value.expireYear}`}
                          className='!mt-0 border-none bg-white-200 dark:text-white dark:bg-gray-800 focus:!ring-0 rounded-none'
                        />
                      </FormControl>
                      <FormMessage className='text-xs font-normal' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cvc'
                  render={({ field: { value, onChange } }) => (
                    <FormItem className='bg-white-200 dark:bg-gray-800 flex mx-0 mt-0 space-y-0 gap-0 border rounded-md w-full relative'>
                      <FormControl>
                        <Input
                          title='The CVV/CVC code (Card Verification Value/Code)'
                          placeholder='CVC'
                          onChange={onChange}
                          defaultValue={value}
                          className='!mt-0 border-none bg-white-200 dark:bg-gray-800 dark:text-white  focus:!ring-0 rounded-none'
                        />
                      </FormControl>
                      <div className='absolute top-3 right-2 hidden sm:block'>
                        <img src={frame} alt='card frame icon' />
                      </div>
                      <FormMessage className='text-xs font-normal' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type='submit'
              className='bg-blue-500 px-0 py-5 h-[55px] text-base dark:text-white-100 md:text-lg font-bold hover:bg-[#3562e9cf]'
            >
              Pay $133.23
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
