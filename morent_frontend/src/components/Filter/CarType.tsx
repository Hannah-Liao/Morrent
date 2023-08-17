import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from '../ui/checkbox';
import { RootState } from '../../store/store';
import { selectCarType } from '../../slice/carFilterSlice';
import { carTypes } from '../../constant';

export default function CarType() {
  const { value } = useSelector(
    ({ selectCarType }: RootState) => selectCarType,
  );
  const dispatch = useDispatch();

  return (
    <ul className='flex flex-col gap-2 md:gap-4 '>
      <h2 className='pt-3'>
        <span className='filter-title'>Type</span>
      </h2>
      {carTypes.map((type) => (
        <li key={type.key} className='flex items-center gap-2'>
          <Checkbox
            className={type.key === value ? '!bg-blue-500' : ''}
            checked={type.key === value}
            onCheckedChange={() => dispatch(selectCarType(type.key))}
          />
          <p className='text-gray-700 font-semibold inline-flex gap-2 dark:text-white'>
            {type.label}
            <span className='text-gray-400'>(10)</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
