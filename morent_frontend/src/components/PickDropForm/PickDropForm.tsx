import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField, FormItem, FormLabel, Form, FormMessage } from '../ui/form';
import { formData } from '../../constant';
import SubmitButton from './SubmitButton';
import LocationSelect from './Location';
import DateSelector from './DateSelector';

export const formSchema = z.object({
  location: z.string(),
  availabilityFrom: z.date(),
  availabilityTo: z.date(),
});

type PickDropFormProps = {
  isShow: boolean;
};

export default function PickDropForm({ isShow }: PickDropFormProps) {
  const searchForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className='flex flex-col lg:flex-row gap-x-3 bg-white md:items-center py-5 lg:py-0 !px-3 dark:bg-gray-850 lg:!px-5 w-full items-center justify-center rounded-md'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:grid-cols-3 items-center px-2 p-5'>
          {formData.map((data) => (
            <FormField
              key={data.key}
              control={searchForm.control}
              name={data.key as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem
                  className={`relative overflow-hidden ${
                    data.label === 'Location'
                      ? 'col-span-1 sm:col-span-2 lg:col-span-1 '
                      : 'col-span-1'
                  } `}
                >
                  <FormLabel
                    title={data.label}
                    className={`text-sm lg:text-xs font-semibold inline-flex truncate  items-center gap-1 text-gray-900 dark:text-white w-full ${
                      data.key === 'availabilityTimeFrom' ||
                      data.key === 'availabilityTimeTo'
                        ? 'pt-[25px]'
                        : ''
                    }`}
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

                  {data.key === 'location' ? (
                    <LocationSelect form={searchForm} />
                  ) : (
                    <DateSelector
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                  <FormMessage />
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
