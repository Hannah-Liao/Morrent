import type { Dispatch, SetStateAction } from 'react';

import Search from '../SearchInput/SearchInput';
import { Button } from '../ui/button';
import { close } from '../../assets/icons';
import { Slider } from '../ui/slider';
import CarType from './CarType';
import CarCapacity from './CarCapacity';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Filter({ isOpen, setIsOpen }: Props) {
  return (
    <section className='md:h-screen overflow-x-hidden flex md:flex-col gap-x-2 md:w-[310px] items-end md:items-start  bg-white dark:bg-gray-900 md:pl-4 relative'>
      <Search setIsOpen={setIsOpen} />
      <div
        className={`w-full h-screen  bg-white dark:bg-gray-900 fixed z-10  transition-all md:w-full md:static   top-0  ${
          !isOpen
            ? '-left-full opacity-0 md:opacity-100'
            : 'left-0 opacity-100 '
        }`}
      >
        <Button
          title='close'
          onClick={() => setIsOpen(false)}
          className='absolute top-5 right-5 bg-transparent md:hidden text-black hover:bg-transparent'
        >
          <img src={close} alt='close icon' />
        </Button>

        <aside className='w-full  bg-white dark:bg-gray-900 md:p-0'>
          <h2 className='text-2xl pt-3 font-semibold text-gray-850 dark:text-gray-100'>
            Filter
          </h2>

          <CarType />
          <CarCapacity />
          <div className='w-full h-full'>
            <h3 className='pt-3'>
              <span className='filter-title'>Price</span>
            </h3>
            <div className='pr-3'>
              <Slider
                id='slider'
                style={{
                  accentColor: 'blue',
                }}
                className='mt-3 !bg-blue-500 !accent-blue-500'
                defaultValue={[100]}
                max={1000}
                step={1}
                onValueChange={(e) => console.log(e)}
              />
              <p
                className='text-lg font-semibold text-gray-700 pt-3 dark:text-white'
                title='Min. $100.00 - Max. $1000.00'
              >
                <span className='text-xs'>Min. $100.00</span> -{' '}
                <span className='text-xs'> Max. $1000.00</span>
              </p>
            </div>
            <Button className='w-[calc(100%-1rem)] bg-blue-500 hover:bg-blue-700  dark:text-white mt-3'>
              Submit
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
