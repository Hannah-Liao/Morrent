import { useDispatch } from 'react-redux';

import { Checkbox } from '../ui/checkbox';
import { selectCarType, setCapacity } from '../../slice/carFilterSlice';
import { CarFilterOptionsProps } from '../../types/carInfo';

export default function CarFilterOptions({
  title,
  options,
  value,
}: CarFilterOptionsProps) {
  const dispatch = useDispatch();

  const handleTypeChange = (value: string) => dispatch(selectCarType(value));
  const handleCapacityChange = (value: string) => dispatch(setCapacity(value));

  return (
    <ul className='flex flex-col gap-2 md:gap-3'>
      <h2 className=' pt-3 md:pt-4'>
        <span className='filter-title'>{title}</span>
      </h2>
      {options.map((item) => (
        <li key={item.key} className='flex items-center gap-2 '>
          <Checkbox
            className={value.includes(item.key) ? '!bg-blue-500' : ''}
            checked={value.includes(item.key)}
            onCheckedChange={() => {
              title === 'Type'
                ? handleTypeChange(item.key)
                : handleCapacityChange(item.key);
            }}
          />
          <p className='text-gray-700 font-semibold inline-flex gap-2 dark:text-white text-sm'>
            {item.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
