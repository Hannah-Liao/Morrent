import { blueRectangle1, blueRectangle2 } from '../../assets/images';

const HomeHeader = () => {
  return (
    <header className='homeHeaderGrid'>
      {/* First Card */}
      <div className='relative group'>
        <div className='overflow-hidden rounded-lg aspect-w-16 aspect-h-9 relative'>
          <img
            className='homeHeaderImage'
            src={blueRectangle1}
            alt='Light blue background with car'
          />
          <div className='absolute top-0 p-[16px] lg:p-[24px] text-left'>
            <h1 className='homeHeaderH1'>
              The Best Platform<br></br> for Car Rental
            </h1>
            <h2 className='homeSubtitle'>
              Ease of doing car rental safely and<br></br> reliably, and at a
              low price.
            </h2>
          </div>
        </div>
      </div>

      {/*  Second Card - does not display on mobile */}
      <div className='relative group hidden sm:block'>
        <div className='overflow-hidden rounded-lg aspect-w-16 aspect-h-9 relative'>
          <img
            className='homeHeaderImage'
            src={blueRectangle2}
            alt='Light blue background with car'
          />
          <div className='absolute top-0 p-[16px] lg:p-[24px]'>
            <h1 className='homeHeaderH1'>
              Easy way to rent a<br></br> car at a low price
            </h1>
            <h2 className='homeSubtitle'>
              Providing cheap car rental services<br></br> and safe and
              comfortable facilities.
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
