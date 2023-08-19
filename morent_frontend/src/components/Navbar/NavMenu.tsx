import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

type props = {
  isHidden?: string;
};

const NavMenu: FC<props> = ({ isHidden }) => {
  return (
    <nav className={isHidden}>
      <ul className='flex flex-col md:flex-row md:justify-center mt-[30%] md:mt-0 items-center gap-10 md:gap-[1.875rem] text-justify p-medium text-gray-700 dark:text-white leading-[150%] tracking-[-0.02rem]'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/search'>Search</NavLink>
        </li>
        <li>
          <NavLink to='/add-car'>Add Car</NavLink>
        </li>

        <li className='btn p-5 min-w-[110px] h-11 p-semibold rounded'>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
