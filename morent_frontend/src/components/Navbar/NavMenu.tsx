import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

type props = {
  isHidden?: string;
};

const NavMenu: FC<props> = ({ isHidden }) => {
  return (
    <nav className={isHidden}>
      <ul className='flex flex-col sm:flex-row sm:justify-center mt-[30%] sm:mt-0 items-center gap-10 sm:gap-[1.875rem] text-justify p-medium text-gray-700 dark:text-white leading-[150%] tracking-[-0.02rem]'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/search'>Search</NavLink>
        </li>
        <li>
          <NavLink to='/add-car'>Add Car</NavLink>
        </li>

        <li className='flex-center gap-2 w-[6.875rem] h-11 bg-blue-500  text-white p-semibold rounded'>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
