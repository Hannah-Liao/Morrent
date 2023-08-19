import { NavLink } from 'react-router-dom';

interface HomeViewAllHeaderProps {
  titleText: string;
}

const HomeViewAllHeader: React.FC<HomeViewAllHeaderProps> = ({ titleText }) => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='flex justify-between leading-[16px] md:leading-[44px] mt-[32px]'>
        <h5 className='body-medium md:p-semibold text-gray-400'>{titleText}</h5>
        <NavLink
          to='/search'
          className='small-regular md:p-semibold text-blue-500'
          onClick={goToTop}
        >
          View All
        </NavLink>
      </div>
    </>
  );
};

export default HomeViewAllHeader;
