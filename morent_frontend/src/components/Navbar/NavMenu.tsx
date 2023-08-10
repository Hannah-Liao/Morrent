import { NavLink } from 'react-router-dom';

type props = {
  isHidden?: string;
  isMobile?: boolean;
};

const NavMenu: React.FC<props> = ({ isHidden, isMobile }) => {
  const layout = {
    mobile:
      'flex flex-col mt-[30%] items-center gap-[2.5rem] text-justify text-[1rem] font-[500] leading-[150%] tracking-[-0.02rem]',
    desktop:
      'flex justify-center items-center gap-[1.875rem] text-justify text-[1rem] font-[500] leading-[150%] tracking-[-0.02rem]',
  };

  return (
    <nav className={isHidden}>
      <ul className={isMobile ? layout.mobile : layout.desktop}>
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
  );
};

export default NavMenu;
