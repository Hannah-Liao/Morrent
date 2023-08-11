import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { DropdownMenuDemo } from '../ModeDropdown';

type props = {
  isHidden?: string;
};

const NavMenu: FC<props> = ({ isHidden }) => {
  return (
    <nav className={isHidden}>
      <ul className='flex flex-col sm:flex-row sm:justify-center mt-[30%] sm:mt-0 items-center gap-[2.5rem] sm:gap-[1.875rem] text-justify text-[1rem] font-[500] leading-[150%] tracking-[-0.02rem]'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/search'>Search</NavLink>
        </li>
        <li>
          <NavLink to='/add-car'>Add Car</NavLink>
        </li>
        <li>
          <DropdownMenuDemo />
        </li>
        <li className='flex justify-center items-center gap-[0.5rem] w-[6.875rem] h-[2.75rem] bg-[#3563E9]  text-[#FFFFFF] rounded-[0.25rem]'>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
