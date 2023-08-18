import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import type { ControllerRenderProps } from 'react-hook-form';
import z from 'zod';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { formSchema } from './PickDropForm';

type CalendarProps = {
  formatDateValue: (value: string) => string;
  key: string;
  field: ControllerRenderProps<z.infer<typeof formSchema>>;
};

export default function CalendarField({
  formatDateValue,
  field,
  key,
}: CalendarProps) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className='bg-white-200 dark:bg-gray-800 dark:border-none focus:!ring-0 w-full truncate text-xs text-gray-400'
      >
        <Button
          variant={'outline'}
          className='text-left inline-flex truncate justify-start hover:text-black dark:hover:text-white'
        >
          {formatDateValue(
            key === 'availabilityFrom'
              ? (field.value as string)
              : (field.value as string),
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 hover:text-black dark:hover:text-white'
        align='start'
      >
        <Calendar
          className='hover:!text-black dark:!hover:text-white'
          mode='single'
          selected={field.value as Date}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
