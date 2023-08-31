import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  CarCard,
  Pagination,
  SearchInput,
  Filter,
  PickDropForm,
} from '../components';
import { CarDataInfo } from '../types/carInfo';
import { useGetAllCarsQuery } from '../services/api';

export default function Search() {
  const [cardModalData, setCardModalData] = useState<null | CarDataInfo>(null);
  const [openModalName, setOpenModalName] = useState<'car_info' | 'rent' | ''>(
    '',
  );

  const [page, setPage] = useState<number>(1);
  // const { state } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isError, isLoading } = useGetAllCarsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className='flex min-h-screen flex-col md:flex-row gap-5 p-2 md:p-0 w-full'>
      <section
        className={`fixed z-10 top-0 md:z-0 md:sticky md:top-20 transition-all ease duration-500  md:h-screen md:max-w-[260px] bg-white h-screen dark:bg-gray-900 w-full overflow-y-auto p-5 ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Filter setIsOpen={setIsOpen} />
      </section>
      <div className='w-full'>
        <div className='md:hidden'>
          <SearchInput setIsOpen={setIsOpen} />
        </div>
        <PickDropForm isShow={false} />
        <section className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 1xl:grid-cols-2 xl:grid-cols-3   gap-8 justify-center pt-9'>
          {data?.cars?.map((car: CarDataInfo) => (
            <div key={car.price} className=' w-full sm:max-w-xs md:max-w-full'>
              <CarCard
                data={car}
                key={car._id}
                setCardModalData={setCardModalData}
                setIsCarModalOpen={() => setOpenModalName('car_info')}
                shouldOpenModal={true}
                hideButton={false}
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
