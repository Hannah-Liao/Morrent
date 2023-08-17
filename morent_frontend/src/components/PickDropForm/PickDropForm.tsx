import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import TimePicker from 'react-time-picker';

import { Button } from '../ui/button';
import { FormField, FormItem, FormLabel, Form, FormMessage } from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { formData } from '../../constant';
import SubmitButton from './SubmitButton';

const formSchema = z.object({
  location: z.string(),
  availabilityFrom: z.string().or(z.date()),
  availabilityTimeFrom: z.string(),
  availabilityTo: z.string().or(z.date()),
  availabilityTimeTo: z.string(),
});

type PickDropFormProps = {
  isShow: boolean;
};

export default function PickDropForm({ isShow }: PickDropFormProps) {
  const searchForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      availabilityFrom: new Date(),
      availabilityTimeFrom: '10:10',
      availabilityTo: new Date(),
      availabilityTimeTo: '10:10',
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className='flex flex-col lg:flex-row gap-x-3 bg-white md:items-center dark:bg-gray-850 p-3 md:p-5 w-full items-end rounded-md'
      >
        <div className='grid grid-cols-2 gap-5 w-full lg:grid-cols-5 '>
          {formData.map((data) => (
            <FormField
              key={data.key}
              control={searchForm.control}
              name={data.key as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem
                  className={`relative overflow-hidden ${
                    data.label === 'Location'
                      ? 'col-span-2 lg:col-span-1 '
                      : 'col-span-1'
                  } `}
                >
                  <FormLabel
                    title={data.label}
                    className='text-sm font-semibold inline-flex truncate  items-center gap-2 text-gray-900 dark:text-white w-full'
                  >
                    <img
                      className={`${
                        data.label === 'Location'
                          ? 'bg-[#3563e94d] p-1 rounded-full'
                          : ''
                      }`}
                      src={data.icon}
                      alt='dots icon'
                    />{' '}
                    {data.label}
                  </FormLabel>

                  {data.key === 'availabilityFrom' ||
                  data.key === 'availabilityTo' ? (
                    <Popover>
                      <PopoverTrigger
                        asChild
                        className='bg-white-200 dark:bg-gray-800 dark:border-none focus:!ring-0 w-full truncate text-xs text-gray-400'
                      >
                        <Button
                          variant={'outline'}
                          className='text-left inline-flex truncate justify-start hover:text-black dark:hover:text-white'
                        >
                          {data.key === 'availabilityFrom'
                            ? field.value
                              ? format(+field.value, 'PPP')
                              : 'Pick a date'
                            : field.value
                            ? format(+field.value, 'PPP')
                            : 'Drop off date'}
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
                  ) : data.key === 'availabilityTimeFrom' ||
                    data.key === 'availabilityTimeTo' ? (
                    <TimePicker
                      disableClock
                      clearIcon
                      onChange={field.onChange}
                      value={field.value}
                    />
                  ) : (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className='bg-white-200 dark:bg-gray-800 dark:border-none focus:!ring-0 w-full truncate text-xs text-gray-400 hover:text-black dark:hover:text-white'>
                        <SelectValue placeholder={data.placeholder} />
                      </SelectTrigger>
                      <SelectContent className='max-h-52 overflow-y-auto focus:ring-0 '>
                        {data.dataSelects &&
                          data.dataSelects.map((data) => (
                            <SelectItem value={data} key={data}>
                              {data}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage className='absolute -bottom-4 md:-bottom-5 text-xs' />
                </FormItem>
              )}
            />
          ))}
        </div>
        <SubmitButton isShow={isShow} />
      </form>
    </Form>
  );
}
