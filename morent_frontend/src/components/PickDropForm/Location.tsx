import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type LocationProps = {
  onChange: (...event: string[]) => void;
  placeholder: string;
};

export default function LocationSelect({
  placeholder,
  onChange,
}: LocationProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sliceNumber, setSliceNumber] = useState<number>(10);

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
    <Select onValueChange={onChange}>
      <SelectTrigger className='bg-white-200 transition-all duration-500 delay-500 ease dark:bg-gray-800 dark:border-none text-left focus:!ring-0 w-full truncate text-xs text-gray-400'>
        <SelectValue placeholder={loading ? 'Loading.....' : placeholder} />
      </SelectTrigger>

      <SelectContent className='max-h-52 overflow-y-auto'>
        {cities.length > 0 ? (
          cities?.slice(0, sliceNumber).map((val) => (
            <SelectItem key={val} value={val} title={val}>
              {val}
            </SelectItem>
          ))
        ) : (
          <SelectItem value={'Loading...'}>Loading...</SelectItem>
        )}
        <button
          className='text-left text-xs pl-8 w-full py-3'
          onClick={() => setSliceNumber((prev) => prev + 5)}
        >
          Load more
        </button>
      </SelectContent>
    </Select>
  );
}
