import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { cn } from '../../lib/utils';
import { pickupLocation } from '../../constant/index';

const formSchema = z.object({
  location: z.string({
    required_error: 'Location is required',
  }),
  startDate: z
    .date()
    .min(new Date(), { message: 'Please select a future date' }),
  endDate: z.date({
    required_error: 'the date is required',
  }),
  dropOffDate: z
    .date()
    .min(new Date(), { message: 'Please select a future date' }),
  dropOfDate: z.date({
    required_error: 'the date is required',
  }),
});

export default function RentNowMadal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <Dialog>
      {/* <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger> */}

      <DialogContent className='max-w-[500px] shrink-0 rounded-[10px] p-[50px] bg-white dark:bg-gray-850 '>
        <DialogHeader className='flex flex-col gap-2.5 mb-7 sm:mb-10'>
          <DialogTitle className='base-bold text-gray-900 dark:text-white'>
            Add Pickup & Drop-Off Info
          </DialogTitle>
          <DialogDescription className='body-medium text-gray-400 dark:text-white-200'>
            Please enter your info
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white leading-[120%]'>
                    Pickup Location
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full h-[46px] sm:h-[56px] bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200'>
                        <SelectValue placeholder='Location Address' />
                      </SelectTrigger>
                      <SelectContent className='bg-white-200 dark:bg-gray-800 capitalize'>
                        <SelectGroup>
                          {pickupLocation.map((location, i) => (
                            <SelectItem value={location} key={i}>
                              {location}
                            </SelectItem>
                          ))}
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
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white flex'>
                      <CalendarIcon className='mr-2 h-4 w-4 text-blue-500 ' />
                      Pick-Up Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full sm:w-[195px] h-[56px] justify-start text-left bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'LLL dd, y')
                          ) : (
                            <span>Select your date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <DateFormField form={...form} /> */}
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
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
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'LLL dd, y')
                          ) : (
                            <span>Select your date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col sm:flex-row gap-6 sm:gap-2.5 '>
              <FormField
                control={form.control}
                name='dropOffDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='body-semibold sm:p-semibold mb-2.5 sm:mb-4 text-gray-900 dark:text-white flex'>
                      <CalendarIcon className='mr-2 h-4 w-4 text-blue-500 ' />
                      Drop-Off Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full sm:w-[195px] h-[56px] justify-start text-left bg-white-200 dark:bg-gray-800 body-regular text-gray-400 dark:text-white-200',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'LLL dd, y')
                          ) : (
                            <span>Select your date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
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
                render={({ field }) => (
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
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'LLL dd, y')
                          ) : (
                            <span>Select your date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
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
      </DialogContent>
    </Dialog>
  );
}
