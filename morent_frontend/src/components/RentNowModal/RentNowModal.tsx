import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import TimePicker from 'react-time-picker';

import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { cn } from '../../lib/utils';
import getCurrentTime from '../../utils/getCurrentTime';
import { dots, clock, calendar } from '../../assets/icons';
import { CarDataInfo } from '../../types/carInfo';
import { toast } from '../ui/use-toast';
import LocationSelect from '../PickDropForm/Location';

const formSchema = z
  .object({
    location: z.string({
      required_error: 'Location is required',
    }),
    pickUpDate: z
      .date()
      .min(new Date(), { message: 'Please select a future date' }),
    dropOffDate: z
      .date()
      .min(new Date(), { message: 'Please select a future date' }),
    pickUpTime: z.string(),
    dropOffTime: z.z.string(),
  })
  .refine((data) => data.dropOffDate >= data.pickUpDate, {
    message: 'Drop off date cannot be earlier than pick up date.',
    path: ['dropOffDate'],
  })
  .refine(
    (data) => {
      const currentTime = Date.now();
      const currentHours = new Date(currentTime).getHours();
      const currentMinutes = new Date(currentTime).getMinutes();
      const [inputHours, inputMinutes] = data.pickUpTime.split(':').map(Number);

      const isGreaterThanNow = inputHours > currentHours;
      return (
        isGreaterThanNow ||
        (inputHours === currentHours && inputMinutes > currentMinutes)
      );
    },
    {
      message: 'Pick up time must not be in the past.',
      path: ['pickUpTime'],
    },
  )
  .refine(
    (data) => {
      const [pickUpHours, pickUpMinutes] = data.pickUpTime
        .split(':')
        .map(Number);
      const [dropOffHours, dropOffMinutes] = data.dropOffTime
        .split(':')
        .map(Number);

      const isGreater =
        dropOffHours > pickUpHours ||
        (dropOffHours === pickUpHours && dropOffMinutes > pickUpMinutes);
      return data.dropOffDate > data.pickUpDate ? true : isGreater;
    },
    {
      message: 'Drop Off Time must not be earlier than pick up time.',
      path: ['dropOffTime'],
    },
  );

interface RentNowModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<'' | 'car_info' | 'rent'>>;
  carData: CarDataInfo;
}

const RentNowModal: React.FC<RentNowModalProps> = ({
  open,
  setOpen,
  carData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUpDate: new Date(),
      pickUpTime: getCurrentTime(),
      dropOffDate: new Date(),
      dropOffTime: getCurrentTime(),
    },
  });
  const today = new Date().toUTCString();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${SERVER_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          carName: carData.title,
          price: carData.price,
          id: carData._id,
          type: carData.carType,
          userId: carData.user,
          data,
        }),
      });
      const response = await res.json();

      window.location.href = await response.url;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open ? 'rent' : '')}>
      <DialogContent className='max-w-[500px] shrink-0 rounded-[10px] px-[16px] sm:px-[50px] py-[40px] sm:py-[50px] bg-white dark:bg-gray-850 '>
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
              render={() => (
                <FormItem>
                  <FormLabel className='formTitle leading-[120%]'>
                    <img
                      src={dots}
                      alt='icon'
                      className='modalIcon bg-[#3563e94d] p-1 rounded-full '
                    />
                    Pickup Location
                  </FormLabel>
                  {/* @ts-ignore */}
                  <LocationSelect form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='gridCol2'>
              <FormField
                control={form.control}
                name='pickUpDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='formTitle'>
                      <img src={calendar} alt='icon' className='modalIcon' />
                      Pick-Up Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'inputArea min-h-[56px] justify-start text-left ',
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
                name='pickUpTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='formTitle'>
                      <img src={clock} alt='icon' className='modalIcon' />
                      Pick-Up Time
                    </FormLabel>
                    <TimePicker
                      disableClock
                      clearIcon={false}
                      onChange={field.onChange}
                      value={field.value}
                      id='modalpickUpTime'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='gridCol2'>
              <FormField
                control={form.control}
                name='dropOffDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='formTitle'>
                      <img src={calendar} alt='icon' className='modalIcon' />
                      Drop-Off Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'inputArea min-h-[56px] justify-start text-left',
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
                name='dropOffTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='formTitle'>
                      <img src={clock} alt='icon' className='modalIcon' />
                      Drop-Off Time
                    </FormLabel>
                    <TimePicker
                      disableClock
                      clearIcon={false}
                      id='modaldropOffTime'
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={carData.rentedDateTo > today}
              type='submit'
              className='btn rounded-[10px] w-full h-[56px] p-bold  mb-[18px]'
            >
              Rent Now
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentNowModal;
