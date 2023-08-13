import { useState } from 'react';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function DropdownMenuDemo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isDarkMode ? (
          <MoonIcon className='fill-[#3D5278] w-6 h-6' />
        ) : (
          <SunIcon className='fill-[#3D5278] w-6 h-6' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-50 mt-9'>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => setIsDarkMode((prev) => !prev)}>
            <SunIcon className='mr-2 h-4 w-4' />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDarkMode((prev) => !prev)}>
            <MoonIcon className='mr-2 h-4 w-4' />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              if (
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
              ) {
                setIsDarkMode(true);
              } else {
                setIsDarkMode(false);
              }
            }}
          >
            <DesktopIcon className='mr-2 h-4 w-4' />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
