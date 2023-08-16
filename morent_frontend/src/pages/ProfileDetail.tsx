import profileImg from '../assets/images/profile.png';
import CarCard from '../components/CarCard/CarCard';
import { cars } from '../constant/index';

const ProfileDetail = () => {
  return (
    <main>
      <section>
        <h1 className='text-gray-900 dark:text-white base-bold mb-6 sm:mb-7 '>
          My Profile
        </h1>
        <div className='rounded-[10px] bg-white dark:bg-gray-850'>
          <div className='relative bg-[url("../src/assets/images/carImage.png")] bg-no-repeat bg-cover min-h-[182px]'>
            <a
              href=''
              className='absolute right-[10px] sm:right-[57px] bottom-[10px] sm:bottom-[23px] flex-center gap-2 bg-white bg-opacity-40 text-white xsmall-regular sm:body-medium rounded py-1.5 sm:py-3 px-2 sm:px-4'
            >
              Edit Cover
            </a>
          </div>

          <div className='relative py-[38px]'>
            <img
              src={profileImg}
              alt='profileImg'
              className='w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] absolute left-[13px] sm:left-[31px] top-[-30px] sm:top-[-50px] rounded-[70px]'
            />

            <div className='ml-3.5 sm:ml-[152px] mt-[10px] sm:mt-0 '>
              <p className='base-bold text-gray-900 dark:text-white'>
                Jane Daniel
              </p>
              <p className='body-regular text-opacity-50 text-gray-900 dark:text-blue-100'>
                Agent
              </p>
            </div>

            <a
              href=''
              className='btn absolute right-[20px] bottom-[10px] sm:top-[38px] px-5 rounded-[10px] small-bold sm:body-bold min-h-[36px] sm:h-[46px]'
            >
              Edit Profile
            </a>
          </div>
        </div>
      </section>

      <section>
        <h1>Rented Cars</h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
          {cars.map((car) => (
            <CarCard key={car.title} {...car} />
          ))}
        </div>
      </section>

      <section>
        <h1>My Cars for Rent</h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
          {cars.map((car) => (
            <CarCard key={car.title} {...car} />
          ))}
        </div>
      </section>

      <a
        href=''
        className='flex-center gap-2 w-[6.875rem] h-11 bg-blue-500 hover:bg-blue-300  text-white p-semibold rounded'
      >
        edit
      </a>
    </main>
  );
};

export default ProfileDetail;
