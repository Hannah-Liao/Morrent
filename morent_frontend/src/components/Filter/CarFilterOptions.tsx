import { useDispatch } from 'react-redux';

import { Checkbox } from '../ui/checkbox';
import { selectCarType, setCapacity } from '../../slice/carFilterSlice';

type CarData = {
  label: string;
  key: string;
};

type CarFilterOptionsProps = {
  title: string;
  options: CarData[];
  value: string;
};
export default function CarFilterOptions({
  title,
  options,
  value,
}: CarFilterOptionsProps) {
  const dispatch = useDispatch();

  const handleTypeChange = (value: string) => dispatch(selectCarType(value));
  const handleCapacityChange = (value: string) => dispatch(setCapacity(value));

  return (
    <ul className='flex flex-col gap-2 md:gap-4'>
      <h2 className=' pt-3 md:pt-5'>
        <span className='filter-title'>{title}</span>
      </h2>
      {options.map((item) => (
        <li key={item.key} className='flex items-center gap-2 '>
          <Checkbox
            className={item.key === value ? '!bg-blue-500' : ''}
            checked={item.key === value}
            onCheckedChange={() => {
              title === 'Type'
                ? handleTypeChange(item.key)
                : handleCapacityChange(item.key);
            }}
          />
          <p className='text-gray-700 font-semibold inline-flex gap-2 dark:text-white'>
            {item.label}
            <span className='text-gray-400'>(10)</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
