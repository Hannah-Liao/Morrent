import z from 'zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import TimePicker from 'react-time-picker';

import { FormField, FormItem, FormLabel, Form, FormMessage } from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { formData } from '../../constant';
import SubmitButton from './SubmitButton';
import CalendarField from './Calendar';
import DateOrSelectField from './DateOrSelectField';

export const formSchema = z.object({
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

  const formatDateValue = (value: string) => {
    return value ? format(+value, 'PPP') : 'Pick a date';
  };

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
                    className='text-sm lg:text-xs font-semibold inline-flex truncate  items-center gap-1 text-gray-900 dark:text-white w-full'
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
                    <CalendarField
                      field={field}
                      formatDateValue={formatDateValue}
                      key={data.key}
                    />
                  ) : (
                    <DateOrSelectField data={data} field={field} />
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
