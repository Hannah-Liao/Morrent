import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Logo } from '../index';
import profileImg from '../../assets/images/profile.png';
import NavMenu from './NavMenu';
import { DropdownMenuDemo } from './ModeDropdown';

const NavBar = () => {
  const isLogin = true;
  const [open, setOpen] = useState(false);

  return (
    <header className='sm:border-b sm:border-[#C3D4E966] bg-white dark:bg-gray-900 min-h-[92px] sm:min-h-[100px]'>
      <div className='max-container flex justify-between items-start px-[20px] sm:px-[60px] py-[32px] sm:py-[28px] '>
        <Logo />
        <div className='flex-center flex-row-reverse sm:flex-row gap-6'>
          <NavMenu isHidden={'hidden sm:block'} />

          <div className='flex gap-4 sm:hidden'>
            {isLogin && (
              <img src={profileImg} alt='profile-img' className='w-7 h-7'></img>
            )}
            <div onClick={() => setOpen((prev) => !prev)}>
              {open ? (
                <Cross1Icon className='text-gray-700 w-6 h-6' />
              ) : (
                <HamburgerMenuIcon className='text-gray-700 w-6 h-6' />
              )}
            </div>
          </div>

          <div className='hidden sm:block bg-blue-50 w-[0.1rem] h-[2.25rem]'></div>
          <DropdownMenuDemo />
        </div>

        {/* mobile */}

        <div
          className={`sm:hidden h-full bg-white dark:bg-gray-900 w-[70%] fixed top-0 ${
            open ? 'left-0' : '-left-full'
          } z-50 transition-all ease-out duration-500`}
        >
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
