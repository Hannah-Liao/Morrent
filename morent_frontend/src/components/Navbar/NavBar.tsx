import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Logo } from '../index';
import profileImg from '../../assets/images/profile.png';
import NavMenu from './NavMenu';
import { ModeDropdown } from './ModeDropdown';

const NavBar = () => {
  const isLogin = true;
  const [open, setOpen] = useState(false);

  return (
    <header className='md:border-b md:border-[#C3D4E966] bg-white dark:bg-gray-900 min-h-[92px] md:min-h-[100px]'>
      <div className='max-container flex justify-between items-start px-[20px] md:px-[60px] py-[32px] md:py-[28px] '>
        <Logo />
        <div className='flex-center flex-row-reverse md:flex-row gap-6'>
          <NavMenu isHidden={'hidden md:block'} />

          <div className='flex gap-4 md:hidden'>
            <div onClick={() => setOpen((prev) => !prev)}>
              {open ? (
                <Cross1Icon className='text-gray-700 w-6 h-6' />
              ) : (
                <HamburgerMenuIcon className='text-gray-700 w-6 h-6' />
              )}
            </div>
          </div>

          {isLogin && (
            <img
              src={profileImg}
              alt='profile-img'
              className='w-7 md:w-9 h-7 md:h-9'
            ></img>
          )}

          <div className='hidden md:block bg-blue-50 w-[0.1rem] h-[2.25rem]'></div>
          <ModeDropdown />
        </div>

        {/* mobile */}

        <div
          className={`md:hidden h-full bg-white dark:bg-gray-900 w-[70%] fixed top-0 ${
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
