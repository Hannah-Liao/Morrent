import { useState, useEffect } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { Logo } from '../index';
import profileImg from '../../assets/images/profile.png';
import NavMenu from './NavMenu';
import { ModeDropdown } from './ModeDropdown';
import { ProfileMenu } from './profileMenu';

const NavBar = () => {
  const isLogin = true;
  const [open, setOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setOpen(false);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header className='fixed w-full z-50 md:border-b md:border-[#C3D4E966] bg-white dark:bg-gray-900 min-h-[92px] md:min-h-[100px]'>
      <div className='max-container flex justify-between items-start px-[20px] md:px-[60px] py-[32px] md:py-[28px] '>
        <Logo />
        <div className='flex-center flex-row-reverse md:flex-row gap-6'>
          <NavMenu isHidden={'hidden md:block'} />

          <HamburgerMenuIcon
            className='text-gray-700 w-6 h-6 md:hidden'
            onClick={() => setOpen((prev) => !prev)}
          />

          {isLogin && <ProfileMenu />}

          {!isLogin && (
            <Link
              to='/login'
              className='btn min-w-[110px] h-11 p-semibold rounded hidden md:flex'
            >
              Login
            </Link>
          )}

          <div className='hidden md:block bg-blue-50 w-[0.1rem] h-[2.25rem]'></div>
          <ModeDropdown />
        </div>

        {/* mobile */}
        <div
          className={`md:hidden rounded-[10px] min-h-fit bg-white-100 dark:bg-gray-850 shadow-[0px_0px_10px_0px_rgba(201, 215, 255, 0.50)] dark:shadow-[0px_0px_10px_0px_#3C475B] w-[95%] fixed left-0 right-0 mx-auto ${
            open ? 'top-[30px]' : '-top-full'
          } z-50 transition-all ease-out duration-500 px-2.5 py-6`}
        >
          <div className='flex justify-between'>
            <Logo />
            <Cross1Icon
              className='text-gray-700 w-6 h-6'
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>

          <NavMenu isMobile={true} />

          <div className='flex flex-col gap-2.5 my-5'>
            <Link
              to={isLogin ? '/profile/:id' : '/login'}
              className='mobileLoginBtn min-full min-h-[49px] px-9 p-semibold rounded'
            >
              <img
                src={profileImg}
                alt='user profile photo'
                className='w-5 h-5 mr-1.5 rounded-[90px]'
              />
              {isLogin ? 'My Profile' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
