import { spinner } from '../../assets/icons';

const Loader = () => {
  return (
    <div className='text-center h-screen flex justify-center mt-[15%]'>
      <img
        src={spinner}
        alt='spinner'
        className='inline w-16 h-16 mr-3 text-white animate-spin'
        aria-hidden='true'
      />
    </div>
  );
};

export default Loader;
