import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { CarDataInfo } from '../types/carInfo';

import {
  CarCard,
  PopularCarsMobile,
  HomeHeader,
  HomeViewAllHeader,
  PickDropForm,
  Pagination,
  Loader,
} from '../components';

import {
  useGetPopularCarsQuery,
  useGetCarListQuery,
  useGetFavCarsQuery,
} from '../services/api';

const Home = () => {
  const [page, setPage] = useState<number>(1);

  const userId = useSelector((state: RootState) => state.userInfo.userId);

  const {
    data: userFavCars,
    isSuccess: isFavCarsSuccess,
    refetch: refetchFavCars,
  } = useGetFavCarsQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const {
    data: carLists,
    isLoading,
    isSuccess,
    isError,
  } = useGetCarListQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: popularCars,
    isError: popularCarError,
    isLoading: popularCarLoading,
  } = useGetPopularCarsQuery('');

  if (isLoading || popularCarLoading) return <Loader />;

  if (isError || popularCarError) return <p>Error....</p>;

  const addIsFavToCars = (cars?: CarDataInfo[], favCars?: CarDataInfo[]) => {
    if (!userId) return cars;
    if (!favCars && !isFavCarsSuccess) return cars;

    return cars?.map((car) => {
      if (favCars?.map((c) => c['_id']).includes(car['_id'])) {
        return {
          ...car,
          isFavorited: true,
        };
      } else {
        return {
          ...car,
          isFavorited: false,
        };
      }
    });
  };

  const popularCarWithFav = addIsFavToCars(popularCars, userFavCars?.favCars);
  const carListsWithFav = addIsFavToCars(carLists?.cars, userFavCars?.favCars);

  return (
    <section className='homeContainer'>
      <HomeHeader />
      <div className='mt-[32px] mb-[36px]'>
        <PickDropForm isShow={true} />
      </div>

      <HomeViewAllHeader titleText='Popular Cars' />

      {isLoading && <Loader />}

      {isSuccess && (
        <div className='homePopularCarsGrid'>
          {popularCarWithFav?.map((car) => (
            <div key={car._id}>
              {window.innerWidth < 500 ? (
                <VisibilitySensor>
                  {({ isVisible }: { isVisible: boolean }) => (
                    <PopularCarsMobile
                      data={car}
                      isHidden={!isVisible}
                      shouldOpenModal={true}
                      afterFavClick={refetchFavCars}
                    />
                  )}
                </VisibilitySensor>
              ) : (
                <PopularCarsMobile
                  data={car}
                  shouldOpenModal={true}
                  afterFavClick={refetchFavCars}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <HomeViewAllHeader titleText='Recommended Cars' />

      {isLoading && <Loader />}
      {isSuccess && (
        <div className='homeRecommendedGrid'>
          {isFavCarsSuccess
            ? carListsWithFav?.map((car) => (
                <CarCard
                  key={car._id}
                  data={car}
                  shouldOpenModal={true}
                  hideButton={false}
                  afterFavClick={refetchFavCars}
                />
              ))
            : carListsWithFav?.map((car) => (
                <CarCard
                  key={car._id}
                  data={car}
                  shouldOpenModal={true}
                  hideButton={false}
                  afterFavClick={refetchFavCars}
                />
              ))}
        </div>
      )}
      <div className='mx-auto text-center py-[64px]'>
        <Pagination
          totalPages={carLists.totalPages}
          page={page}
          currentLength={carLists.cars.length}
          setPage={setPage}
        />
      </div>
    </section>
  );
};

export default Home;
