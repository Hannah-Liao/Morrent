import { useState, type Dispatch, type SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../ui/button';
import { close } from '../../assets/icons';
import { Slider } from '../ui/slider';
import { SearchInput } from '..';
import { RootState } from '../../store/store';
import CarFilterOptions from './CarFilterOptions';
import { carFilterOptions } from '../../constant';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Filter({ setIsOpen }: Props) {
  const { capacity, type } = useSelector(
    ({ carFilter: { value } }: RootState) => value,
  );
  const [selectedPrice, setSelectedPrice] = useState([100]);

  const handleSubmit = () => {
    setIsOpen(false);
    console.log({ capacity, type, selectedPrice });
  };

  return (
    <aside className='w-full  flex flex-col md:pr-3'>
      <div className='hidden md:block'>
        <SearchInput setIsOpen={setIsOpen} />
      </div>
      <Button
        title='close'
        onClick={() => setIsOpen(false)}
        className='absolute top-5 right-5 bg-transparent md:hidden text-black hover:bg-transparent'
      >
        <img src={close} alt='close icon' />
      </Button>
      <h2 className='text-2xl pt-3 font-semibold text-gray-850 dark:text-gray-100'>
        Filter
      </h2>

      <CarFilterOptions
        title='Type'
        options={carFilterOptions.type}
        value={type}
      />
      <CarFilterOptions
        title='Capacity'
        options={carFilterOptions.capacity}
        value={capacity}
      />

      <div className='w-full h-full'>
        <h3 className='pt-1 md:pt-3'>
          <span className='filter-title'>Price</span>
        </h3>
        <div>
          <Slider
            id='slider'
            className='mt-3 !bg-blue-500 !accent-blue-500'
            defaultValue={selectedPrice}
            max={1000}
            step={1}
            onValueChange={(e) => setSelectedPrice(e)}
          />
          <div className='text-lg font-semibold text-gray-700 pt-3 dark:text-white'>
            <p className='pt-3 text-xs'>Price : ${selectedPrice}.00</p>
            <p title='Min. $100.00 - Max. $1000.00'>
              <span className='text-xs'>Min. $100.00</span> -{' '}
              <span className='text-xs'> Max. $1000.00</span>
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className='w-[calc(100%-1rem)] bg-blue-500 hover:bg-blue-700  dark:text-white mt-3'
        >
          Submit
        </Button>
      </div>
    </aside>
  );
}
