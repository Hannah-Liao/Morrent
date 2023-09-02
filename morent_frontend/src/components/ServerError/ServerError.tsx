import { serverErrorIcon } from '../../assets/icons';

const ServerError = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white-200 dark:bg-gray-900'>
      <div className='text-center'>
        <div className='inline-flex rounded-full bg-blue-500 p-2'>
          <div className='rounded-full stroke-blue-500 bg-white dark:bg-gray-200 p-4'>
            <img
              src={serverErrorIcon}
              alt='Server Error Icon'
              className='w-12 h-12 text-white'
            />
          </div>
        </div>
        <h2 className='mt-5 text-[24px] font-bold text-blue-500 lg:text-[40px]'>
          Server error
        </h2>
        <p className='text-slate-600 mt-5 text-sm lg:text-md'>
          Oops something went wrong. Try to refresh this page or <br /> feel
          free to contact us if the problem presists.
        </p>
      </div>
    </div>
  );
};

export default ServerError;
