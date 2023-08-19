import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function ModeDropdown() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (
      mode === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {mode === 'dark' ? (
          <MoonIcon className='text-blue-500 w-5 h-5' />
        ) : (
          <SunIcon className='text-blue-500 w-5 h-5' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-50 mt-9'>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              setMode('light');
              localStorage.theme = 'light';
            }}
          >
            <SunIcon className='mr-2 h-4 w-4' />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setMode('dark');
              localStorage.theme = 'dark';
            }}
          >
            <MoonIcon className='mr-2 h-4 w-4' />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              localStorage.removeItem('theme');
              if (
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
              ) {
                setMode('dark');
              } else {
                setMode('light');
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
