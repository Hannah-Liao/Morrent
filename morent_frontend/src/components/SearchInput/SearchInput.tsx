import { filter, search, filterDark } from '../../assets/icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
export default function SearchInput({ setIsOpen, setTitle }: Props) {
  const theme = localStorage.getItem('theme');

  const iconSrc = theme === 'dark' ? filterDark : filter;

  return (
    <div className=' bg-white w-full dark:bg-gray-900 md:p-0 flex items-end p-5 dark:p-0 gap-2 mb-5 md:mb-0 '>
      <div className='relative w-full'>
        <Input
          onChange={(e) => setTitle(e.target.value as string)}
          title='Search by brand or title'
          placeholder='Search by brand or title'
          className=' focus:!ring-0 pl-10 text-sm font-medium bg-white-200 placeholder:text-blue-100 dark:bg-gray-850 dark:border-none dark:text-white dark:focus:!border-none'
        />
        <div className='absolute top-3 left-3 '>
          <img src={search} alt='search icon' width={15} />
        </div>
      </div>

      <Button
        type='button'
        variant='outline'
        className='block md:hidden dark:border border-blue-500 rounded-md '
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={iconSrc} alt='filter icon' />
      </Button>
    </div>
  );
}
