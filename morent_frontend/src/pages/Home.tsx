import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { useSelector } from 'react-redux';

import {
  CarCard,
  PopularCarsMobile,
  HomeHeader,
  HomeViewAllHeader,
  PickDropForm,
  Loader,
  ServerError,
} from '../components';
import { CarDataInfo } from '../types/carInfo';
import {
  useGetPopularCarsQuery,
  useGetCarListQuery,
  useGetFavCarsQuery,
} from '../services/api';
import { Pagination } from '../components/index';
import { RootState } from '../store/store';

const Home: React.FC = () => {
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

  if (isError || popularCarError) return <ServerError />;

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
    <>
      <section className='homeContainer'>
        {/* Big Header Cards */}
        <HomeHeader />

        {/* Search Bar */}

        <div className='mt-[32px] mb-[36px]'>
          <PickDropForm isShow={true} />
        </div>

        <>
          {/* Popular Cars Header */}
          <HomeViewAllHeader titleText='Popular Cars' />

          {/* Popular Cars Grid */}
          {isLoading && <Loader />}

          {isSuccess && (
            <div className='homePopularCarsGrid'>
              {popularCarWithFav?.map((car) => (
                <div key={car._id}>
                  {/* Blur cards that are not fully in the viewport on mobile */}
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
        </>

        <>
          {/* Recommended Cars Header*/}
          <HomeViewAllHeader titleText='Recommended Cars' />

          {/* Recommended Cars Grid*/}
          {isLoading && <p>Loading...</p>}
          {isSuccess && (
            <div className='homeRecommendedGrid'>
              {/* Show more cars on button click*/}
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
        </>

        <div className='mx-auto text-center py-[64px]'>
          <Pagination
            totalPages={carLists.totalPages}
            page={page}
            currentLength={carLists.cars.length}
            setPage={setPage}
          />
        </div>
      </section>
    </>
  );
};

export default Home;

// import { useState } from 'react';
// import VisibilitySensor from 'react-visibility-sensor';

// import {
//   CarCard,
//   PopularCarsMobile,
//   HomeHeader,
//   HomeViewAllHeader,
//   CarInfoModal,
//   PickDropForm,
//   RentNowModal,
// } from '../components';
// import { CarDataInfo } from '../types/carInfo';
// import { useGetPopularCarsQuery, useGetCarListQuery } from '../services/api';
// import Pagination from '../components/Pagination/Pagination';

// const Home = () => {
//   const [cardModalData, setCardModalData] = useState<null | CarDataInfo>(null);
//   const [openModalName, setOpenModalName] = useState<'car_info' | 'rent' | ''>(
//     '',
//   );
//   const [page, setPage] = useState<number>(1);

//   const { data, isError, isLoading } = useGetCarListQuery(page, {
//     refetchOnMountOrArgChange: true,
//   });
//   const {
//     data: popularCars,
//     isError: popularCarError,
//     isLoading: popularCarLoading,
//   } = useGetPopularCarsQuery('');

//   if (isLoading || popularCarLoading) return <p>Loading....</p>;

//   if (isError || popularCarError) return <p>Error....</p>;

//   return (
//     <>
//       <section className='homeContainer'>
//         <HomeHeader />
//         <div className='mt-[32px] mb-[36px]'>
//           <PickDropForm isShow={true} />
//         </div>

//         <HomeViewAllHeader titleText='Popular Cars' />

//         <section className=' w-full relative'>
//           <div className='homePopularCarsGrid '>
//             {popularCars?.map((car) => (
//               <div key={car._id}>
//                 {window.innerWidth < 500 ? (
//                   <VisibilitySensor>
//                     {({ isVisible }: { isVisible: boolean }) => (
//                       <PopularCarsMobile
//                         data={car}
//                         isHidden={!isVisible}
//                         setCardModalData={setCardModalData}
//                         setIsCarModalOpen={() => setOpenModalName('car_info')}
//                         shouldOpenModal={true}
//                       />
//                     )}
//                   </VisibilitySensor>
//                 ) : (
//                   <PopularCarsMobile
//                     data={car}
//                     setCardModalData={setCardModalData}
//                     setIsCarModalOpen={() => setOpenModalName('car_info')}
//                     shouldOpenModal={true}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className='absolute top-0 bg-gradient-to-l from-white dark:from-[#2E3C56] dark:to-[#2e3c5600] -right-6 h-full bottom-0 w-11'></div>
//         </section>

//         <HomeViewAllHeader titleText='Recommended Cars' />

//         <div className='homeRecommendedGrid' id='car-container'>
//           {data?.cars.map((car: CarDataInfo) => (
//             <CarCard
//               key={car._id}
//               data={car}
//               setCardModalData={setCardModalData}
//               setIsCarModalOpen={() => setOpenModalName('car_info')}
//               shouldOpenModal={true}
//               hideButton={false}
//             />
//           ))}
//         </div>

//         <div className='mx-auto text-center py-[64px]'>
//           <Pagination
//             totalPages={data.totalPages}
//             page={page}
//             currentLength={data.cars.length}
//             setPage={setPage}
//           />
//         </div>
//       </section>

//       <CarInfoModal
//         open={openModalName === 'car_info'}
//         setOpen={setOpenModalName}
//         data={cardModalData}
//       />

//       <RentNowModal
//         carData={cardModalData as CarDataInfo}
//         open={openModalName === 'rent'}
//         setOpen={setOpenModalName}
//       />
//     </>
//   );
// };

// export default Home;

// {
//   isFavCarsSuccess
//     ? finalCarsData.map((car) => (
//         <CarCard
//           key={car._id}
//           data={car}
//           shouldOpenModal={true}
//           hideButton={false}
//           afterFavClick={refetchFavCars}
//         />
//       ))
//     : finalCarsData.map((car) => (
//         <CarCard
//           key={car._id}
//           data={car}
//           shouldOpenModal={true}
//           hideButton={false}
//           afterFavClick={refetchFavCars}
//         />
//       ));
// }
