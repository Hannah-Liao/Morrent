import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  CarCard,
  Pagination,
  SearchInput,
  Filter,
  PickDropForm,
  Loader,
} from '../components';
import { RootState } from '../store/store';
import { useGetCarListQuery, useGetFavCarsQuery } from '../services/api';
import { CarDataInfo } from '../types/carInfo';

export default function Search() {
  const userId = useSelector((state: RootState) => state.userInfo.userId);
  const [page, setPage] = useState<number>(1);
  const { data, isError, isLoading } = useGetCarListQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const { cars } = useSelector(
    ({ CarSearchResults }: RootState) => CarSearchResults,
  );
  const {
    data: userFavCars,
    isSuccess: isFavCarsSuccess,
    refetch: refetchFavCars,
  } = useGetFavCarsQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error...</p>;

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

  if (isLoading) return <Loader />;
  if (isError) return <p>Error...</p>;

  const carsWithFav = addIsFavToCars(cars?.cars, userFavCars?.favCars);
  const dataWithFav = addIsFavToCars(data?.cars, userFavCars?.favCars);

  return (
    <div className='flex min-h-screen flex-col md:flex-row gap-5 md:p-0 w-full'>
      <section
        className={`fixed z-10 top-0 md:z-0 md:sticky md:top-20 transition-all ease duration-500  md:h-screen md:max-w-[260px] bg-white h-screen dark:bg-gray-900 w-full overflow-y-auto p-5 ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Filter setIsOpen={setIsOpen} setTitle={setTitle} title={title} />
      </section>
      <div className='w-full'>
        <div className='md:hidden'>
          <SearchInput setIsOpen={setIsOpen} setTitle={setTitle} />
        </div>
        <PickDropForm isShow={false} />
        <>
          <h2 className='py-3'>Search Result</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 1xl:grid-cols-2 xl:grid-cols-3 gap-8 justify-center pt-9'>
            {carsWithFav?.map((car) => (
              <div key={car.price} className='w-full sm:max-w-xs md:max-w-full'>
                <CarCard
                  data={car}
                  key={car._id}
                  shouldOpenModal={true}
                  hideButton={false}
                  afterFavClick={refetchFavCars}
                />
              </div>
            ))}
          </div>
        </>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 1xl:grid-cols-2 xl:grid-cols-3 gap-8 justify-center pt-9'>
          {dataWithFav?.map((car) => (
            <div key={car.price} className='w-full sm:max-w-xs md:max-w-full'>
              <CarCard
                data={car}
                key={car._id}
                shouldOpenModal={true}
                hideButton={false}
                afterFavClick={refetchFavCars}
              />
            </div>
          ))}
        </section>

        <div className='mx-auto text-center py-[64px]'>
          <Pagination
            totalPages={data.totalPages}
            page={page}
            currentLength={data.cars.length}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
