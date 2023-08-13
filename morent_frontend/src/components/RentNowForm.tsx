import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../lib/utils';
import { xmark } from '../assets/icons';

const formSchema = z.object({
  location: z.string({
    required_error: 'Location is required',
  }),
  startDate: z
    .date()
    .min(new Date(), { message: 'Date can not be in the past' }),
  endDate: z.date({
    required_error: 'the date is required',
  }),
});

export function ProfileForm() {
  const [date, setDate] = useState<Date>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <div className='w-[500px] shrink-0 rounded-[10px] p-[50px] bg-white dark:bg-gray-850'>
      <div className='flex flex-col-reverse sm:flex-row sm:justify-between '>
        <div className='flex flex-col gap-2.5'>
          <h2 className='base-bold text-gray-900 dark:text-white'>
            Add Pickup Location
          </h2>
          <p className='body-medium text-gray-400 dark:text-white-200'>
            Please enter your location info
          </p>
        </div>
        <img
          src={xmark}
          alt='xmark'
          className='w-8 h-8 relative left-[92%] sm:left-[1%]'
        />
      </div>

      <h3 className='heading-3-bold text-blue-500 uppercase my-8'>
        Pickup Info
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='location'
            render={() => (
              <FormItem>
                <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white leading-[120%]'>
                  Pickup Location
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-[400px] h-[46px] sm:h-[56px] bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200'>
                      <SelectValue placeholder='Location Address' />
                    </SelectTrigger>
                    <SelectContent className='bg-white-200 dark:bg-gray-800'>
                      <SelectGroup>
                        <SelectItem value='apple'>London</SelectItem>
                        <SelectItem value='banana'>Bristol</SelectItem>
                        <SelectItem value='blueberry'>York</SelectItem>
                        <SelectItem value='grapes'>Birminham</SelectItem>
                        <SelectItem value='pineapple'>Bath</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className='text-xs font-normal' />
              </FormItem>
            )}
          />

          <div className='flex flex-col sm:flex-row gap-6 sm:gap-2.5 '>
            <FormField
              control={form.control}
              name='startDate'
              render={() => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white flex'>
                    <CalendarIcon className='mr-2 h-4 w-4 text-blue-500 ' />
                    Availability From
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full sm:w-[195px] h-[56px] justify-start text-left bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200',
                          !date && 'text-muted-foreground',
                        )}
                      >
                        {date ? (
                          format(date, 'LLL dd, y')
                        ) : (
                          <span>Select your date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endDate'
              render={() => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white flex'>
                    <CalendarIcon className='mr-2 h-4 w-4 text-blue-500 ' />
                    Availability To
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full sm:w-[195px] h-[56px] justify-start text-left bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200',
                          !date && 'text-muted-foreground',
                        )}
                      >
                        {/* <CalendarIcon className='mr-2 h-4 w-4' /> */}
                        {date ? (
                          format(date, 'LLL dd, y')
                        ) : (
                          <span>Select your date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='bg-blue-500 rounded-[10px] w-full h-[56px] p-bold text-white mb-[18px]'
          >
            Rent Now
          </Button>
        </form>
      </Form>
    </div>
  );
}
