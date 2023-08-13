import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Logo } from '../index';
import profileImg from '../../assets/images/profile.png';
import NavMenu from './NavMenu';

const NavBar = () => {
  const isLogin = true;
  const [open, setOpen] = useState(false);

  return (
    <header className='border border-[#C3D4E966] bg-white flex justify-between h-[5.75rem] sm:h-[6.25rem] py-8 sm:py-7 px-6 sm:px-[3.75rem] items-start'>
      <Logo />

      <NavMenu isHidden={'hidden sm:block'} />

      <div className='flex gap-4 sm:hidden'>
        {isLogin && (
          <img src={profileImg} alt='profile-img' className='w-7 h-7'></img>
        )}
        <div onClick={() => setOpen((prev) => !prev)}>
          {open ? (
            <Cross1Icon className='fill-gray-700 w-6 h-6' />
          ) : (
            <HamburgerMenuIcon className='fill-gray-700 w-6 h-6' />
          )}
        </div>
      </div>

      {open && (
        <div className='sm:hidden h-full bg-white w-[70%] fixed top-0 left-0 z-50'>
          <NavMenu />
        </div>
      )}
    </header>
  );
};

export default NavBar;
