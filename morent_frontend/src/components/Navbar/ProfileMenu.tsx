import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import profileImg from '../../assets/images/profile.png';

export function ProfileMenu() {
  const useID = '123454';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={profileImg}
          alt='user profile photo'
          className='w-7 md:w-9 h-7 md:h-9 rounded-[90px] cursor-pointer'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-50 mt-8'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='dropDownIcons' />
            <Link to={`/profile/${useID}`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='dropDownIcons' />
          <Link to='/'>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
