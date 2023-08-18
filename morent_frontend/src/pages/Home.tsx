import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {
  CarCard,
  PopularCarsMobile,
  HomeHeader,
  HomeViewAllHeader,
  CarInfoModal,
  PickDropForm,
  RentNowModal,
} from '../components/index';
import { CarInfo } from '../types/carInfo';
import { cars } from '../constant';

const Home: React.FC = () => {
  const [showMoreCars, setShowMoreCars] = useState<boolean>(false);
  const [cardModalData, setCardModalData] = useState<null | CarInfo>(null);
  const [openModalName, setOpenModalName] = useState<'car_info' | 'rent' | ''>(
    '',
  );

  return (
    <>
      <section className='homeContainer'>
        {/* Big Header Cards */}
        <HomeHeader />

        {/* Search Bar */}
        <div className='mt-[32px] mb-[36px]'>
          <PickDropForm isShow={true} />
        </div>

        {/* Popular Cars Section*/}
        <>
          {/* Popular Cars Header */}
          <HomeViewAllHeader titleText='Popular Cars' />

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
                        setCardModalData={setCardModalData}
                        setIsCarModalOpen={() => setOpenModalName('car_info')}
                        shouldOpenModal={true}
                      />
                    )}
                  </VisibilitySensor>
                ) : (
                  <PopularCarsMobile
                    data={car}
                    setCardModalData={setCardModalData}
                    setIsCarModalOpen={() => setOpenModalName('car_info')}
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
          <HomeViewAllHeader titleText='Recommended Cars' />

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
                      setCardModalData={setCardModalData}
                      setIsCarModalOpen={() => setOpenModalName('car_info')}
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
                      setCardModalData={setCardModalData}
                      setIsCarModalOpen={() => setOpenModalName('car_info')}
                      shouldOpenModal={true}
                      hideButton={false}
                    />
                  ))}
          </div>
        </>

        {/* Button */}
        <div className='mx-auto text-center py-[64px]'>
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
        open={openModalName === 'car_info'}
        setOpen={setOpenModalName}
        data={cardModalData}
      />

      {/* Rent Now Modal */}
      <RentNowModal
        open={openModalName === 'rent'}
        setOpen={setOpenModalName}
      />
    </>
  );
};

export default Home;
