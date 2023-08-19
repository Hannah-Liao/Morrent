import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { filter, search, filterDark } from '../../assets/icons';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Form,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';

const formSchema = z.object({
  searchValue: z.string(),
});
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function SearchInput({ setIsOpen }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchValue: '',
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  const theme = localStorage.getItem('theme');

  const iconSrc = theme === 'dark' ? filterDark : filter;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' bg-white dark:bg-gray-900 md:p-0 flex items-end p-5 dark:p-0 gap-2 mb-5 md:mb-0 '
      >
        <FormField
          control={form.control}
          name='searchValue'
          render={({ field }) => (
            <FormItem className='relative flex-1 '>
              <FormLabel className=' font-semibold text-xs text-blue-100'>
                Search
              </FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input
                    title='Search by brand or title'
                    placeholder='Search by brand or title'
                    {...field}
                    className=' focus:!ring-0 pl-10 text-sm font-medium bg-white-200 placeholder:text-blue-100 dark:bg-gray-850 dark:border-none dark:text-white dark:focus:!border-none'
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
        <Button
          type='button'
          variant='outline'
          className='block md:hidden dark:border border-blue-500 rounded-md '
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={iconSrc} alt='filter icon' />
        </Button>
      </form>
    </Form>
  );
}
