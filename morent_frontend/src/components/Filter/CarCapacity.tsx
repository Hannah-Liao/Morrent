import { Checkbox } from '../ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCapacity } from '../../slice/carCapacity';
import { CarCapacityLists } from '../../constant';

export default function CarCapacity() {
  const { value } = useSelector((state: RootState) => state.setCapacity);
  const dispatch = useDispatch();

  return (
    <ul className='flex flex-col gap-2 md:gap-4'>
      <h2 className=' pt-3 md:pt-5'>
        <span className='filter-title'>Capacity</span>
      </h2>
      {CarCapacityLists.map((item) => (
        <li key={item.key} className='flex items-center gap-2 '>
          <Checkbox
            className={item.key === value ? '!bg-blue-500' : ''}
            checked={item.key === value}
            onCheckedChange={() => dispatch(setCapacity(item.key))}
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
