import { useState } from 'react';

import {
  CarCard,
  Pagination,
  SearchInput,
  Filter,
  PickDropForm,
} from '../components';
import { CarDataInfo } from '../types/carInfo';
import { useGetCarListQuery } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Search() {
  const [, setCardModalData] = useState<null | CarDataInfo>(null);
  const [, setOpenModalName] = useState<'car_info' | 'rent' | ''>('');
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cars } = useSelector(
    ({ CarSearchResults }: RootState) => CarSearchResults,
  );

  const { data, isError, isLoading } = useGetCarListQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  const results = data.cars.length > 1 ? data.cars : cars;

  return (
    <div className='flex min-h-screen flex-col md:flex-row gap-5 p-2 md:p-0 w-full'>
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
        <section className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 1xl:grid-cols-2 xl:grid-cols-3   gap-8 justify-center pt-9'>
          {results?.map((car: CarDataInfo) => (
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
