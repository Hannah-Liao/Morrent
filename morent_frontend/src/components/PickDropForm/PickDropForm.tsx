import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import { searchWhite } from '../../assets/icons';
import { FormField, FormItem, FormLabel, Form, FormMessage } from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { format } from 'date-fns';

import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { formData } from '../../constant';

const formSchema = z.object({
  location: z.string(),
  pickUpDate: z.date().or(z.number()).nullish(),
  pickUpTime: z.string(),
  dropOffDate: z.date().or(z.number()).nullish(),
  dropOffTime: z.string(),
});

export default function PickDropForm({ isShow }: { isShow: boolean }) {
  const searchForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      dropOffDate: undefined,
      dropOffTime: '',
      pickUpDate: undefined,
      pickUpTime: '',
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className='flex flex-col lg:flex-row gap-3 bg-white  w-full items-end rounded-md'
      >
        <div className='grid grid-cols-2 gap-5 w-full lg:grid-cols-5'>
          {formData.map((data) => (
            <FormField
              key={data.key}
              control={searchForm.control}
              // @ts-ignore
              name={data.key}
              render={({ field }) => (
                <FormItem
                  className={`${
                    data.label === 'Location'
                      ? 'col-span-2 lg:col-span-1 '
                      : 'col-span-1'
                  } `}
                >
                  <FormLabel className='text-sm md:text-base font-semibold inline-flex  items-center gap-2 text-[#1A202C] w-[159px]'>
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
                  {data.key === 'pickUpDate' || data.key === 'dropOffDate' ? (
                    <Popover>
                      <PopoverTrigger
                        asChild
                        className='bg-[#F6F7F9] focus:!ring-0 w-full truncate text-xs text-[#90A3BF]'
                      >
                        <Button
                          variant={'outline'}
                          className='text-left inline-flex justify-start'
                        >
                          {field.value
                            ? format(field.value as number, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          // @ts-ignore
                          selected={field?.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className='bg-[#F6F7F9] focus:!ring-0 w-full truncate text-xs text-[#90A3BF] hover:text-black'>
                        <SelectValue placeholder={data.placeholder} />
                      </SelectTrigger>
                      <SelectContent className='max-h-52 overflow-y-auto focus:ring-0 '>
                        {data.dataSelects.map((data) => (
                          <SelectItem value={data} key={data}>
                            {data}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div
          className={` ${!isShow ? 'w-full lg:w-[40px]' : 'w-full lg:w-auto'}`}
        >
          <Button
            type='submit'
            className='bg-blue-500 w-full flex items-center gap-2 p-3 rounded-md text-white'
          >
            <img src={searchWhite} alt='search icon' width={15} />{' '}
            <span className={isShow ? 'block' : 'lg:hidden'}>Search</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
