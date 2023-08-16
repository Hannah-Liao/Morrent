import profileImg from '../assets/images/profile.png';
import CarCard from '../components/CarCard/CarCard';
import { cars } from '../constant/index';

const ProfileDetail = () => {
  return (
    <main>
      <section>
        <h1>My Profile</h1>
        <div>
          <div className='border border-red relative bg-[url("../src/assets/images/carImage.png")] bg-no-repeat bg-cover min-h-[182px]'>
            <a
              href=''
              className='absolute right-[10px] bottom-[10px] flex-center gap-2 w-[6.875rem] h-11 bg-blue-500 hover:bg-blue-300  text-white p-semibold rounded'
            >
              edit
            </a>
          </div>

          <div className='border border-red relative py-[38px]'>
            <img
              src={profileImg}
              alt=''
              className='w-[120px] absolute left-[20px] top-[-30px] border border-red'
            />

            <div className='border border-red ml-[152px] mt-[80px] sm:mt-0'>
              <p>Jane Daniel</p>
              <p>Agent</p>
            </div>

            <a
              href=''
              className=' absolute right-[20px] bottom-[10px] sm:top-[38px] flex-center gap-2 w-[6.875rem] h-11 bg-blue-500 hover:bg-blue-300  text-white p-semibold rounded'
            >
              edit
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
