import { Checkbox } from '../ui/checkbox';
import { useRef, type Dispatch, type SetStateAction } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import z from 'zod';

import { Form, FormControl, FormField, FormItem } from '../ui/form';
import Search from '../SearchInput/SearchInput';
import { Button } from '../ui/button';
import { filter } from '../../assets/icons';
import useClickOutSide from '../../hooks/useClickOutside';

const filterData = [
  {
    title: 'Type',
    data: [
      {
        label: 'Sport',
        key: 'sport',
      },
      {
        label: 'MPV',
        key: 'mpv',
      },
      {
        label: 'Sedan',
        key: 'sedan',
      },
      {
        label: 'Coupe',
        key: 'coupe',
      },
      {
        label: 'Hatchback',
        key: 'hatchback',
      },
    ],
  },
  {
    title: 'Capacity',
    data: [
      {
        label: 'Sport',
        key: 'sport',
      },
      {
        label: 'MPV',
        key: 'mpv',
      },
      {
        label: 'Sedan',
        key: 'sedan',
      },
      {
        label: 'Coupe',
        key: 'coupe',
      },
      {
        label: 'Hatchback',
        key: 'hatchback',
      },
    ],
  },
  {
    title: 'Price',
    data: [
      {
        label: 'Sport',
        key: 'sport',
      },
      {
        label: 'MPV',
        key: 'mpv',
      },
      {
        label: 'Sedan',
        key: 'sedan',
      },
      {
        label: 'Coupe',
        key: 'coupe',
      },
      {
        label: 'Hatchback',
        key: 'hatchback',
      },
    ],
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FormSchema = z.object({
  sport: z.boolean().default(false).optional(),
  suv: z.boolean().default(false).optional(),
  sedan: z.boolean().default(false).optional(),
  mpv: z.boolean().default(false).optional(),
  coupe: z.boolean().default(false).optional(),
  hatchback: z.boolean().default(false).optional(),
});

export default function Filter({ isOpen, setIsOpen }: Props) {
  const drawerRef = useRef(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useClickOutSide(drawerRef, () => setIsOpen(false));

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <section className='md:h-screen p-3 overflow-x-hidden flex md:flex-col gap-2 md:w-72 items-end md:items-start overflow-y-auto'>
      <Search />
      <div
        className={`w-screen fixed transition-all backdrop-blur-sm md:w-full  md:static bg-black bg-opacity-5 top-0  ${
          !isOpen
            ? '-left-full opacity-0 md:opacity-100'
            : 'left-0 opacity-100 '
        }`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={drawerRef}
            className='transition ease p-4 md:p-0 duration-300 w-52 sm:w-60 md:w-full bg-white text-black top-0 md:flex flex-col justify-start'
          >
            {filterData.map((formData) => (
              <div key={formData.title}>
                <h2 className='text-xs font-semibold uppercase text-[#94A7CB] py-5'>
                  {formData.title}
                </h2>
                {formData.data.map((val) => (
                  <FormField
                    key={val.key}
                    // @ts-ignore
                    name={val.key}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem
                        className='flex items-center space-y-0  gap-2'
                        key={val.label}
                      >
                        <FormControl className=''>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <label className='text-base md:text-xl font-semibold text-[#3D5278]'>
                          {val.label}
                          <span className='font-medium text-[#90A3BF]'>
                            (10)
                          </span>
                        </label>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
            <Button type='submit' className='mt-6' variant={'secondary'}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <Button
        type='button'
        variant='outline'
        className='block md:hidden'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={filter} alt='filter icon' />
      </Button>
    </section>
  );
}
