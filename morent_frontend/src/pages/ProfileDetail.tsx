import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import profileImg from '../assets/images/profile.png';
import { CarsDispalySection, Loader, ServerError } from '../components';
import {
  useGetCarsByUserQuery,
  useGetUserByIdQuery,
  useGetFavCarsQuery,
} from '../services/api';
import { RootState } from '../store/store';
import { CarDataInfo } from '../types/carInfo';

const ProfileDetail = () => {
  const { data, isLoading, isError } = useGetUserByIdQuery('');
  const {
    data: cars,
    isError: carError,
    isLoading: carLoading,
  } = useGetCarsByUserQuery('');

  const userId = useSelector((state: RootState) => state.userInfo.userId);
  const { data: userFavCars, refetch: refetchUserFavCars } = useGetFavCarsQuery(
    userId,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  if (isLoading || carLoading) return <Loader />;
  if (isError || carError) return <ServerError />;

  const finalCarsData = userFavCars?.favCars?.map((car: CarDataInfo) => {
    return {
      ...car,
      isFavorited: true,
    };
  });

  console.log(cars.data);

  return (
    <main>
      <section>
        <h1 className='text-gray-900 dark:text-white base-bold mb-6 sm:mb-7 '>
          My Profile
        </h1>
        <div className='rounded-[10px] bg-white dark:bg-gray-850'>
          <div className='relative bg-[url("../src/assets/images/cover.png")] bg-center bg-no-repeat bg-cover min-h-[182px] rounded-tl-[10px] rounded-tr-[10px]'>
            <a
              href=''
              className='absolute right-[10px] sm:right-[57px] bottom-[10px] sm:bottom-[23px] flex-center gap-2 bg-white bg-opacity-40 text-white xsmall-regular sm:body-medium rounded py-1.5 sm:py-3 px-2 sm:px-4'
            >
              Edit Cover
            </a>
          </div>

          <div className='relative pt-[31px] pb-[38px]'>
            <img
              src={profileImg}
              alt='user profile photo'
              className='w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] absolute left-[13px] sm:left-[31px] top-[-30px] sm:top-[-50px] rounded-[70px]'
            />

            <div className='ml-3.5 sm:ml-[152px] mt-[10px] sm:mt-0 '>
              <p className='base-bold text-gray-900 dark:text-white'>
                {data.name}
              </p>
              <p className='body-regular text-opacity-50 text-gray-900 dark:text-blue-100'>
                Agent
              </p>
            </div>

            <a
              href='/edit-profile'
              className='btn absolute right-[20px] bottom-[10px] sm:top-[31px] rounded-[10px] small-bold sm:body-bold min-h-[36px] sm:h-[46px]'
            >
              Edit Profile
            </a>
          </div>
        </div>
      </section>

      <section className='pt-10'>
        <h2 className='subtitle'>Favorite Cars</h2>
        <CarsDispalySection
          carsData={finalCarsData?.length > 0 && finalCarsData}
          afterFavClick={refetchUserFavCars}
        />
      </section>

      <section className='pt-10'>
        <h1 className='subtitle'>My Cars for Rent</h1>
        <CarsDispalySection
          hideButton={true}
          editIcon={true}
          carsData={cars.data}
        />
      </section>

      <section className='pt-10'>
        <h1 className='subtitle'>Favorite Cars</h1>
        <CarsDispalySection
          carsData={finalCarsData?.length > 0 && finalCarsData}
          afterFavClick={refetchUserFavCars}
        />
      </section>

      <Link
        to='/add-car'
        className='btn rounded sm:rounded-[10px] min-h-[37px] sm:min-h-[56px] w-fit small-semibold sm:p-bold mx-auto my-12'
      >
        Add More Cars for Rent
      </Link>
    </main>
  );
};

export default ProfileDetail;
