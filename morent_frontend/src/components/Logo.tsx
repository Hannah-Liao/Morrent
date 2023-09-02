import { Link } from 'react-router-dom';

const Logo = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <h1 className='text-blue-500 heading-2-bold md:heading-1-bold leading-[120%] tracking-[0.0625rem]'>
      <Link to='/' onClick={goToTop}>
        MORENT
      </Link>
    </h1>
  );
};

export default Logo;
