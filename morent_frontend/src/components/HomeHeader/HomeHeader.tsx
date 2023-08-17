import { headerText } from '../../constant';

const HomeHeader = () => {
  return (
    <header className='homeHeaderGrid'>
      {headerText.map((item, i) => (
        <div
          className={`relative group ${i === 1 ? 'hidden sm:block' : ''}`}
          key={item.title1}
        >
          <div className='overflow-hidden rounded-lg aspect-w-16 aspect-h-9 relative'>
            <img
              className='homeHeaderImage'
              src={item.background}
              alt='Blue background with car'
            />
            <div className='absolute top-0 p-[16px] lg:p-[24px] text-left'>
              <h1 className='homeHeaderH1'>
                {item.title1}
                <br></br>
                {item.title2}
              </h1>
              <h2 className='homeSubtitle'>
                {item.subtitle1}
                <br></br>
                {item.subtitle2}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </header>
  );
};

export default HomeHeader;
