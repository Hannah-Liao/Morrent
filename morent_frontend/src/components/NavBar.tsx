import { NavLink } from 'react-router-dom';

import { Logo } from './index';

const NavBar = () => {
  return (
    <header className='border border-[#C3D4E966] bg-white flex h-[6.25rem] py-[1.75rem] px-[3.75rem] justify-center items-start gap-[50.875rem]'>
      <Logo />

      <nav>
        <ul className='flex justify-center items-center gap-[1.875rem] text-justify text-[1rem] font-[500] leading-[150%] tracking-[-0.02rem]'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/search'>Search</NavLink>
          </li>
          <li>
            <NavLink to='/add-car'>Add Car</NavLink>
          </li>
          <li className='flex justify-center items-center gap-[0.5rem] w-[6.875rem] h-[2.75rem] bg-[#3563E9]  text-[#FFFFFF] rounded-[0.25rem]'>
            <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
