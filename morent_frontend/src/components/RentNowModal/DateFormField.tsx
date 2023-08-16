import { CalendarIcon, Calendar } from 'lucide-react';
import { format } from 'path';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

import type { FC } from 'react';
type props = {
  form?: string;
};

const DateFormField: FC<props> = () => {
  return (
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
  );
};

export default DateFormField;
