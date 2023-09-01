import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { updateLogin } from '../../slice/loginSlice';
import { useLogoutMutation } from '../../services/api';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      dispatch(
        updateLogin({
          isLoggedIn: false,
          email: '',
        }),
      );
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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
            <Link to={`/profile`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='dropDownIcons' />
          <Link to='/' onClick={handleLogout}>
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
