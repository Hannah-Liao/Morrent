import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { search } from '../../assets/icons';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Form,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  searchValue: z.string(),
});

export default function SearchInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchValue: '',
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' bg-white w-full md:w-[200px]'
      >
        <FormField
          control={form.control}
          name='searchValue'
          render={({ field }) => (
            <FormItem className='relative '>
              <FormLabel className=' font-semibold text-xs text-[#94A7CB]'>
                Search
              </FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    title='Search by brand or title'
                    placeholder='Search by brand or title'
                    {...field}
                    className=' focus:!ring-0 pl-10 text-sm font-medium'
                  />
                </FormControl>
                <div className='absolute top-3 left-3 '>
                  <img src={search} alt='search icon' width={15} />
                </div>
              </div>
              <FormMessage className='text-xs font-normal' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
