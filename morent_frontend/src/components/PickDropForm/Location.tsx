import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type LocationProps = {
  onChange: (...event: any[]) => void;
  placeholder: string;
};

export default function LocationSelect({
  placeholder,
  onChange,
}: LocationProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserCountry = async () => {
    try {
      const response1 = await fetch('https://api.ipify.org/?format=json');
      const { ip } = await response1.json();

      const response2 = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await response2.json();

      await fetchCitiesInCountry(locationData?.country_name);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitiesInCountry = async (country: string) => {
    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          country,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      };
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/cities',
        requestOptions as RequestInit,
      );
      const result = await response.json();

      if (!result.error) {
        setCities(result.data.splice(0, 40));
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserCountry();
  }, []);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className='bg-white-200 transition-all duration-500 delay-500 ease dark:bg-gray-800 dark:border-none text-left focus:!ring-0 w-full truncate text-xs text-gray-400'>
        <SelectValue placeholder={loading ? 'Loading.....' : placeholder} />
      </SelectTrigger>

      <SelectContent className='max-h-52 overflow-y-auto'>
        {cities?.map((val) => (
          <SelectItem key={val} value={val} title={val}>
            {val}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
