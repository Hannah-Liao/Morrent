import profileImg from '../assets/images/profile.png';
import { CarsDispalySection } from '../components';

const ProfileDetail = () => {
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
                Jane Daniel
              </p>
              <p className='body-regular text-opacity-50 text-gray-900 dark:text-blue-100'>
                Agent
              </p>
            </div>

            <a
              href=''
              className='btn absolute right-[20px] bottom-[10px] sm:top-[31px] rounded-[10px] small-bold sm:body-bold min-h-[36px] sm:h-[46px]'
            >
              Edit Profile
            </a>
          </div>
        </div>
      </section>

      <section className='pt-10'>
        <h1 className='subtitle'>Rented Cars</h1>
        <CarsDispalySection />
      </section>

      <section className='pt-10'>
        <h1 className='subtitle'>My Cars for Rent</h1>
        <CarsDispalySection hideButton={true} editIcon={true} />
      </section>

      <a
        href='/add-car'
        className='btn rounded sm:rounded-[10px] min-h-[37px] sm:min-h-[56px] w-fit small-semibold sm:p-bold mx-auto my-12'
      >
        Add More Cars for Rent
      </a>
    </main>
  );
};

export default ProfileDetail;
