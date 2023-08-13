import { useState } from 'react';

import CarCard from '../components/CarCard/CarCard';
import { cars } from '../constant/index';
import { blueRectangle1, blueRectangle2 } from '../assets/images/index';
import PopularCardMobile from '../components/PopularCardMobile/PopularCardMobile';

const Home: React.FC = () => {
  const [showMoreCars, setShowMoreCars] = useState(false);

  return (
    <section className='py-3 px-[8px] md:px-[24px]'>
      {/* Big Cards */}
      <div className='grid grid-cols-1 mx-auto text-center sm:text-left sm:grid-cols-2 gap-y-[32px] gap-x-[32px]'>
        <div className='relative group'>
          <div className='overflow-hidden rounded-lg aspect-w-16 aspect-h-9 relative'>
            <img
              className='object-cover w-full h-[232px] lg:h-[360px] transition-all duration-300 transform group-hover:scale-100'
              src={blueRectangle1}
              alt='Light blue background with car'
            />
            <div className='absolute top-0 p-[16px] lg:p-[24px] text-left'>
              <h1 className='p-semibold md:heading-3-bold lg:heading-1-semibold text-white -tracking-[0.16px] md:-tracking-[0.32px] leading-[22px] lg:leading-[38.4px] mb-[4px] lg:mb-[16px] md:text-left'>
                The Best Platform<br></br> for Car Rental
              </h1>
              <h2 className='small-regular lg:p-medium text-white leading-[19.2px] lg:leading-[25.6px] tracking-[0.32px]'>
                Ease of doing car rental safely and<br></br> reliably, and at a
                low price.
              </h2>
            </div>
          </div>
        </div>

        <div className='relative group hidden sm:block'>
          <div className='overflow-hidden rounded-lg aspect-w-16 aspect-h-9 relative'>
            <img
              className='object-cover w-full h-[232px]  lg:h-[360px] transition-all duration-300 transform group-hover:scale-100'
              src={blueRectangle2}
              alt='Light blue background with car'
            />
            <div className='absolute top-0 p-[16px] lg:p-[24px]'>
              <h1 className='p-semibold md:heading-3-bold lg:heading-1-semibold  text-white -tracking-[0.32px] leading-[22px] lg:leading-[38.4px] mb-[4px] lg:mb-[16px]'>
                Easy way to rent a<br></br> car at a low price
              </h1>
              <h2 className='small-regular lg:p-medium text-white leading-[19.6px] lg:leading-[25.6px] tracking-[0.32px]'>
                Providing cheap car rental services<br></br> and safe and
                comfortable facilities.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <section className='h-[136px] border-2 border-red my-[36px]'>
        <p>Search Bar</p>
      </section>

      {/* Popular Cars */}
      <>
        <section className='flex justify-between leading-[16px] md:leading-[44px]'>
          <h5 className='body-medium md:p-semibold text-gray-400 px-[20px]'>
            Popular Cars
          </h5>
          <a
            href='#' // where does this go?
            className='small-regular md:p-semibold text-blue-500 px-[20px]'
          >
            View All
          </a>
        </section>
        <div className='grid grid-cols-1 grid-flow-col sm:grid-flow-row gap-[10px] sm:gap-x-8 gap-y-8 mt-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0 overflow-x-auto scrollbar-hide'>
          {cars.slice(0, 4).map((car) => (
            <div key={car.title}>
              <PopularCardMobile {...car} />
            </div>
          ))}
        </div>
      </>

      {/* Recommended Cars */}
      <>
        <section className='flex justify-between leading-[16px] md:leading-[44px] mt-[32px]'>
          <h5 className='body-medium md:p-semibold text-gray-400 px-[20px]'>
            Recommended Cars
          </h5>
          <a
            href='#' // where does this go?
            className='small-regular md:p-semibold text-blue-500 px-[20px]'
          >
            View All
          </a>
        </section>
        <div className='grid grid-cols-1 gap-x-8 gap-y-8 mt-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
          {showMoreCars
            ? cars
                .slice(0, 16)
                .map((car) => <CarCard key={car.title} {...car} />)
            : cars
                .slice(0, 8)
                .map((car) => <CarCard key={car.title} {...car} />)}
        </div>
      </>

      {/* Button */}
      <div className='mx-auto text-center py-[64px]'>
        {' '}
        <button
          className='cardButton px-[50px] h-[55px]'
          onClick={() => setShowMoreCars((prevCars) => !prevCars)}
        >
          {showMoreCars ? 'Hide cars' : 'Show more cars'}
        </button>
      </div>
    </section>
  );
};

export default Home;
