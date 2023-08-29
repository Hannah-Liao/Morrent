import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentLength: number;
  allData: number;
};

export default function Pagination({
  page,
  currentLength,
  setPage,
  allData,
}: PaginationProps) {
  const handlePageChange = (operation: 'increment' | 'decrement') => {
    setPage((prev) => (operation === 'increment' ? prev + 1 : prev - 1));
  };
  console.log('page:', page);
  console.log('currentLength:', currentLength);
  console.log('allData:', allData);

  return (
    <div className='flex flex-col md:flex-row items-center md:items gap-4 justify-center md:justify-between border-t pt-3'>
      <p className='text-xs tracking-widest dark:text-white'>
        Page: {page} <br />
        Showing {currentLength} of {allData} results
      </p>
      <div className='inline-flex gap-3'>
        <Button
          disabled={page === 1}
          variant={'outline'}
          className='bg-white'
          onClick={() => handlePageChange('decrement')}
        >
          Previous
        </Button>
        <Button
          disabled={page === currentLength}
          variant={'outline'}
          className='bg-white'
          onClick={() => handlePageChange('increment')}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
