import { CheckIcon } from '@radix-ui/react-icons';
import type { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

type LocationProps = {
  form: UseFormReturn<{
    location: string;
    availabilityFrom: Date;
    availabilityTo: Date;
  }>;
};

export default function LocationSelect({ form }: LocationProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const fetchUserCountry = async () => {
    try {
      const response1 = await fetch('https://api.ipify.org/?format=json');
      const { ip } = await response1.json();

      const response2 = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await response2.json();

      await fetchCitiesInCountry(
        locationData?.country_name,
        locationData?.region,
      );
    } catch (error) {
      setError('Something went wrong when fetching country data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCitiesInCountry = async (country: string, state: string) => {
    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          country,
          state,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      };
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        requestOptions as RequestInit,
      );
      const result = await response.json();

      if (!result.error) {
        setCities(result.data);
      }
    } catch (error) {
      setError('Something went wrong when fetching cities');
    }
  };

  useEffect(() => {
    fetchUserCountry();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className='bg-white-200 transition-all duration-500 delay-500 ease dark:bg-gray-800 dark:border-none text-left focus:!ring-0 !w-full truncate text-xs text-gray-400 '
      >
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {loading
            ? 'loading...'
            : form.getValues('location') || 'Select your city'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 h-[200px] '>
        <Command className='!w-full '>
          <CommandInput placeholder='Search your City' className='h-9' />
          <CommandEmpty className='text-xs text-center inline-flex gap-3 flex-col'>
            <span>No Cities Found</span>
          </CommandEmpty>
          <CommandGroup className=' overflow-y-auto flex justify-start'>
            {cities.map((city) => (
              <CommandItem
                value={city}
                key={city}
                onSelect={(currentValue) => {
                  form.setValue('location', currentValue);
                  setOpen(false);
                }}
              >
                {city}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    form.getValues('location') === city
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
