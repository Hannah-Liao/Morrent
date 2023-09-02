import { useState, type Dispatch, type SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { close } from '../../assets/icons';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { RootState } from '../../store/store';
import { SearchInput } from '..';
import { carFilterOptions } from '../../constant';
import CarFilterOptions from './CarFilterOptions';
import { setCarSearchResults } from '../../slice/filterResults';
import { useToast } from '../ui/use-toast';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
};

export default function Filter({ setIsOpen, setTitle, title }: Props) {
  const { capacity, type } = useSelector(
    ({ carFilter }: RootState) => carFilter.value,
  );
  const { toast } = useToast();
  const [selectedPrice, setSelectedPrice] = useState([100]);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/car?title=${title}&price=${selectedPrice}&type=${type}&capacity=${capacity}`,
      );
      const datas = await res.json();
      if (datas.cars.length < 1) {
        toast({
          variant: 'destructive',
          className: 'text-white',
          title: 'We can not find cars that you are looking for',
        });
      }
      dispatch(setCarSearchResults(datas));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <aside className='w-full  flex flex-col md:pr-3 overflow-y-auto h-screen'>
      <div className='hidden md:block'>
        <SearchInput setIsOpen={setIsOpen} setTitle={setTitle} />
      </div>
      <Button
        title='close'
        onClick={() => setIsOpen(false)}
        className='absolute top-5 right-5 bg-transparent md:hidden text-black hover:bg-transparent'
      >
        <img src={close} alt='close icon' />
      </Button>
      <h2 className='text-2xl pt-3 font-semibold text-gray-850 md:hidden dark:text-gray-100'>
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
