import { Dispatch, SetStateAction, type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { navlinks } from '../../constant';

type Props = {
  isHidden?: string;
  isMobile?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const NavMenu: FC<Props> = ({ isHidden, isMobile, setOpen }) => {
  return (
    <nav className={isHidden}>
      <ul
        className={`flex flex-col md:flex-row justify-center mt-8 md:mt-0 md:items-center gap-1 md:gap-[1.875rem] text-justify p-medium text-gray-700 dark:text-white leading-[150%] tracking-[-0.02rem]`}
      >
        {navlinks.map(({ label, icon, path }) => (
          <li key={label} onClick={() => setOpen(false)}>
            <NavLink to={path} className='flex gap-1.5 p-3 md:p-0'>
              {isMobile && (
                <img
                  src={icon}
                  alt='nav links icons'
                  className='dark:invert dark:brightness-0'
                />
              )}

              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
