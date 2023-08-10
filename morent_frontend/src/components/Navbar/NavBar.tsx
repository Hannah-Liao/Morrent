import { useState } from 'react';

import { Logo } from '../index';
import profileImg from '../../assets/images/profile.png';
import NavMenu from './NavMenu';

const NavBar = () => {
  const isLogin = true;
  const [open, setOpen] = useState(false);

  return (
    <header className='border border-[#C3D4E966] bg-white flex justify-between h-[5.75rem] sm:h-[6.25rem] py-[2rem] sm:py-[1.75rem] px-[1.5rem] sm:px-[3.75rem] items-start'>
      <Logo />

      <NavMenu isHidden={'hidden sm:block'} />

      <div className='flex gap-4 sm:hidden'>
        {isLogin && (
          <img
            src={profileImg}
            alt='profile-img'
            className='w-[1.75rem] h-[1.75rem]'
          ></img>
        )}
        <div onClick={() => setOpen((prev) => !prev)}>
          {!open ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 448 512'
              className='fill-[#3D5278] w-[1.6rem] h-[1.6rem]'
            >
              <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 384 512'
              className='fill-[#3D5278] w-[1.6rem] h-[1.6rem]'
            >
              <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
            </svg>
          )}
        </div>
      </div>

      {open && (
        <div className='h-full bg-white w-[70%] fixed top-0 left-0 z-50'>
          <NavMenu isMobile={true} />
        </div>
      )}
    </header>
  );
};

export default NavBar;
