import { useState } from 'react';
import { Filter, PickDropForm } from '../components';

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='w-full h-screen overflow-hidden bg-white dark:bg-gray-750'>
      <section className='w-full flex flex-col md:flex-row md:items-start  '>
        <Filter isOpen={isOpen} setIsOpen={setIsOpen} />
        <section className='h-screen w-full snap-y overflow-y-auto p-5  '>
          <PickDropForm isShow={false} />
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-9 '>
            {[1, 2, 3, 4, 5, 6, 7].map((card) => (
              // example card
              <a
                key={card}
                href='#'
                className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
              >
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
