import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

import {
  CarCard,
  PopularCarsMobile,
  HomeHeader,
  CarInfoModal,
} from '../components/index';
import { CarInfo } from '../types/carInfo';
import { cars } from '../constant';

const Home: React.FC = () => {
  const [showMoreCars, setShowMoreCars] = useState<boolean>(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [cardModalData, setCardModalData] = useState<null | CarInfo>(null);

  return (
    <>
      <section className='py-3 px-[8px] md:px-[24px] pt-[20px] sm:pt-[0.5%]'>
        {/* Big Header Cards */}
        <HomeHeader />

        {/* Search Bar */}
        <div className='h-[136px] border-2 border-red my-[36px]'>
          <p>Search Bar</p>
        </div>

        {/* Popular Cars Section*/}
        <>
          {/* Popular Cars Header */}
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

          {/* Popular Cars Grid */}
          <div className='homePopularCarsGrid'>
            {cars.slice(0, 4).map((car, i) => (
              <div key={i}>
                {/* Blur cards that are not fully in the viewport on mobile */}
                {window.innerWidth < 500 ? (
                  <VisibilitySensor>
                    {({ isVisible }: { isVisible: boolean }) => (
                      <PopularCarsMobile
                        data={car}
                        isHidden={!isVisible}
                        setIsCarModalOpen={setIsCarModalOpen}
                        setCardModalData={setCardModalData}
                        shouldOpenModal={true}
                      />
                    )}
                  </VisibilitySensor>
                ) : (
                  <PopularCarsMobile
                    data={car}
                    setIsCarModalOpen={setIsCarModalOpen}
                    setCardModalData={setCardModalData}
                    shouldOpenModal={true}
                  />
                )}
              </div>
            ))}
          </div>
        </>

        {/* Recommended Cars Section*/}
        <>
          {/* Recommended Cars Header*/}
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

          {/* Recommended Cars Grid*/}
          <div className='homeRecommendedGrid'>
            {/* Show more cars on button click*/}
            {showMoreCars
              ? cars
                  .slice(0, 16)
                  .map((car, i) => (
                    <CarCard
                      key={i}
                      data={car}
                      setIsCarModalOpen={setIsCarModalOpen}
                      setCardModalData={setCardModalData}
                      shouldOpenModal={true}
                      hideButton={false}
                    />
                  ))
              : cars
                  .slice(0, 8)
                  .map((car, i) => (
                    <CarCard
                      key={i}
                      data={car}
                      setIsCarModalOpen={setIsCarModalOpen}
                      setCardModalData={setCardModalData}
                      shouldOpenModal={true}
                      hideButton={false}
                    />
                  ))}
          </div>
        </>

        {/* Button */}
        <div className='mx-auto text-center py-[64px]'>
          {' '}
          <button
            className='cardButton px-[50px] min-h-[55px]'
            onClick={() => setShowMoreCars((prevCars) => !prevCars)}
          >
            {showMoreCars ? 'Hide cars' : 'Show more cars'}
          </button>
        </div>
      </section>

      {/* Car Info Modal */}
      <CarInfoModal
        open={isCarModalOpen}
        setOpen={setIsCarModalOpen}
        data={cardModalData}
      />

      {/* <RentNowForm /> // Will set this up when Hannah's RentNowForm Modal is merged to main*/}
    </>
  );
};

export default Home;
