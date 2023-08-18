import z from 'zod';
import TimePicker from 'react-time-picker';
import type { ControllerRenderProps } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { formSchema } from './PickDropForm';

type formData = (
  | {
      icon: string;
      label: string;
      dataSelects: string[];
      key: string;
      placeholder: string;
      errorMessage: string;
    }
  | {
      icon: string;
      label: string;
      key: string;
      placeholder: string;
      errorMessage: string;
      dataSelects?: undefined;
    }
)[];

type DateOrSelectFieldProps = {
  data: formData[0];
  field: ControllerRenderProps<z.infer<typeof formSchema>>;
};

export default function DateOrSelectField({
  data,
  field,
}: DateOrSelectFieldProps) {
  const isTimeField =
    data.key === 'availabilityTimeFrom' || data.key === 'availabilityTimeTo';
  if (isTimeField) {
    return (
      <TimePicker
        disableClock
        clearIcon
        onChange={field.onChange}
        value={field.value}
      />
    );
  } else {
    return (
      <Select onValueChange={field.onChange}>
        <SelectTrigger className='bg-white-200 dark:bg-gray-800 dark:border-none focus:!ring-0 w-full truncate text-xs text-gray-400 hover:text-black dark:hover:text-white'>
          <SelectValue placeholder={data.placeholder} />
        </SelectTrigger>
        <SelectContent className='max-h-52 overflow-y-auto focus:ring-0 '>
          {data.dataSelects
            ? data.dataSelects.map((data) => (
                <SelectItem value={data} key={data}>
                  {data}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>
    );
  }
}
