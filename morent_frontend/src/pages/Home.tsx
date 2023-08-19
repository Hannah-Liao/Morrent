import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

import {
  CarCard,
  PopularCarsMobile,
  HomeHeader,
  PickDropForm,
} from '../components/index';
import { cars } from '../constant/index';

const Home: React.FC = () => {
  const [showMoreCars, setShowMoreCars] = useState(false);

  return (
    <section className='py-3 px-[8px] md:px-[24px] pt-[20px] sm:pt-[0.5%]'>
      {/* Big Cards */}
      <HomeHeader />

      {/* Search Bar */}
      <div className=' py-5'>
        <PickDropForm isShow={true} />
      </div>

      {/* Popular Cars */}
      <>
        <div className='flex justify-between leading-[16px] md:leading-[44px]'>
          <h5 className='body-medium md:p-semibold text-gray-400'>
            Popular Cars
          </h5>
          <NavLink
            to='/search'
            className='small-regular md:p-semibold text-blue-500'
          >
            View All
          </NavLink>
        </div>
        <div className='homePopularCarsGrid'>
          {cars.slice(0, 4).map((car) => (
            <div key={car.title}>
              {/* Blur overflowing cards on mobile */}
              {window.innerWidth < 500 ? (
                <VisibilitySensor>
                  {({ isVisible }: { isVisible: boolean }) => (
                    <PopularCarsMobile {...car} isHidden={!isVisible} />
                  )}
                </VisibilitySensor>
              ) : (
                <PopularCarsMobile {...car} />
              )}
            </div>
          ))}
        </div>
      </>

      {/* Recommended Cars */}
      <>
        <div className='flex justify-between leading-[16px] md:leading-[44px] mt-[32px]'>
          <h5 className='body-medium md:p-semibold text-gray-400'>
            Recommended Cars
          </h5>
          <NavLink
            to='/search'
            className='small-regular md:p-semibold text-blue-500'
          >
            View All
          </NavLink>
        </div>
        <div className='homeRecommendedGrid'>
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
