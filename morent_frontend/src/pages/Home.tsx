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
import { CarDataInfo } from '../types/carInfo';
import { useGetCarListQuery, useGetPopularCarsQuery } from '../services/api';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const [cardModalData, setCardModalData] = useState<null | CarDataInfo>(null);
  const [openModalName, setOpenModalName] = useState<'car_info' | 'rent' | ''>(
    '',
  );
  const [page, setPage] = useState<number>(1);

  const { data, isError, isLoading } = useGetCarListQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: popularCars,
    isError: popularCarError,
    isLoading: popularCarLoading,
  } = useGetPopularCarsQuery('');

  if (isLoading || popularCarLoading) return <p>Loading....</p>;

  if (isError || popularCarError) return <p>Error....</p>;

  console.log(data);

  return (
    <>
      <section className='homeContainer'>
        <HomeHeader />
        <div className='mt-[32px] mb-[36px]'>
          <PickDropForm isShow={true} />
        </div>

        <HomeViewAllHeader titleText='Popular Cars' />

        <section className=' w-full relative'>
          <div className='homePopularCarsGrid '>
            {popularCars?.map((car) => (
              <div key={car._id}>
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
          <div className='absolute top-0 bg-gradient-to-l from-white dark:from-[#2E3C56] dark:to-[#2e3c5600] -right-6 h-full bottom-0 w-11'></div>
        </section>

        <HomeViewAllHeader titleText='Recommended Cars' />

        <div className='homeRecommendedGrid' id='car-container'>
          {data?.cars.map((car: CarDataInfo) => (
            <CarCard
              key={car._id}
              data={car}
              setCardModalData={setCardModalData}
              setIsCarModalOpen={() => setOpenModalName('car_info')}
              shouldOpenModal={true}
              hideButton={false}
            />
          ))}
        </div>

        <div className='mx-auto text-center py-[64px]'>
          <Pagination
            allData={data.count}
            page={page}
            currentLength={data.cars.length}
            setPage={setPage}
          />
        </div>
      </section>

      <CarInfoModal
        open={openModalName === 'car_info'}
        setOpen={setOpenModalName}
        data={cardModalData}
      />

      <RentNowModal
        open={openModalName === 'rent'}
        setOpen={setOpenModalName}
      />
    </>
  );
};

export default Home;
