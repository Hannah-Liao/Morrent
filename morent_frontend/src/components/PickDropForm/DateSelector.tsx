import { formatDateValue } from '../../utils/formatDate';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type DateSelectorProps = {
  value: string | Date;
  onChange: (...event: any[]) => void;
};

export default function DateSelector({ value, onChange }: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className='bg-white-200 dark:bg-gray-800 dark:border-none text-left focus:!ring-0 w-full truncate text-xs text-gray-400'
      >
        <Button
          variant={'outline'}
          className='text-left flex truncate justify-start hover:text-black dark:hover:text-white'
        >
          {formatDateValue(value as string)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto hover:text-black dark:hover:text-white'
        align='start'
      >
        <Calendar
          className='hover:!text-black dark:!hover:text-white'
          mode='single'
          selected={value as Date}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
