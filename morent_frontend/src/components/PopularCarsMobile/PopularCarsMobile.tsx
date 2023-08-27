import { Dispatch, SetStateAction, useState } from 'react';

import { carShadow } from '../../assets/images/index';
import {
  gasStation,
  people,
  heartNoFill,
  heartFilled,
  transmission,
} from '../../assets/icons/index';
import { CarDataInfo } from '../../types/carInfo';

interface CarCardProps {
  data: CarDataInfo | null;
  isHidden?: boolean;
  setCardModalData: Dispatch<SetStateAction<CarDataInfo | null>>;
  setIsCarModalOpen: Dispatch<SetStateAction<boolean>>;
  shouldOpenModal: boolean;
}

const PopularCarsMobile: React.FC<CarCardProps> = ({
  data,
  isHidden,
  setCardModalData,
  setIsCarModalOpen,
  shouldOpenModal = false,
}) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  if (!data) return;

  return (
    <div className={`popular-card  ${isHidden ? 'blur-xs' : ''}`}>
      {/* Car Title Section */}
      <header className='flex justify-between p-[16px] sm:p-[24px]'>
        <div className='flex-3 w-[90%] overflow-hidden'>
          <h3 className='cardTitle'>{data?.title}</h3>
          <h4 className='cardSubtitle'>{data?.carType}</h4>
        </div>
        <div className='flex-1'>
          <img
            src={isFavorited ? heartFilled : heartNoFill}
            className='isFavoritedIcon'
            alt='Red Heart Icon'
            aria-label='Red Heart Icon'
            onClick={() =>
              setIsFavorited((prevIsFavorited) => !prevIsFavorited)
            }
          />
        </div>
      </header>

      <div className='flex justify-between items-center flex-col'>
        <div className='w-full lg:w-full mx-auto relative'>
          <div
            style={{ backgroundImage: `url(${data.carImages[0]})` }}
            className='cardImage'
          >
            <img
              className='h-[64px] w-full opacity:90 mt-10 dark:opacity-0 absolute bottom-0 left-0 right-0'
              src={carShadow}
              alt='Shadow overlay'
            />
          </div>
        </div>
        {/* Stats*/}
        <ul className='cardIconContainer flex-row w-full mb-2 mt-5 body-medium px-4 sm:px-6'>
          <li className='cardIconItem'>
            <img
              src={gasStation}
              alt='Gas Station Icon'
              className='cardIcon'
              aria-label='Gas Station Icon'
            />
            <span>{data.fuelTankSize}L</span>
          </li>
          <li className='cardIconItem'>
            <img
              src={transmission}
              alt='Transmission Icon'
              className='cardIcon'
              aria-label='Transmission Icon'
            />
            <span className='first-letter:capitalize'>
              {data.transmissionType}
            </span>
          </li>
          <li className='cardIconItem'>
            <img
              src={people}
              alt='People Icon'
              className='cardIcon'
              aria-label='People Icon'
            />
            <span>
              {data.capacity > 1
                ? `${data.capacity} People`
                : `${data.capacity} Person`}
            </span>
          </li>
        </ul>
      </div>

      {/* Price Section */}
      <div className='flex justify-between align-center p-[16px] sm:p-[24px]'>
        {/* Price */}
        <div className='flex-1'>
          <h3
            className={
              data.discountPrice > 0 ? 'cardPrice' : 'cardPrice mt-[10px]'
            }
            title={`${data.price}.00 / day`}
          >
            ${data.price}.00 /
            <span className='small-regular md:body-bold text-gray-400'>
              day
            </span>
          </h3>
          {data.discountPrice > 0 && (
            <h4
              className='cardDiscountedPrice'
              title={`${data?.discountPrice}.00 / day`}
            >
              ${data.discountPrice}.00
            </h4>
          )}
        </div>
        {/* Button */}
        <div className='flex-1 text-right'>
          <button
            type='button'
            className='cardButton lg:text-[14px]'
            onClick={() => {
              if (shouldOpenModal) {
                setIsCarModalOpen(true);
                setCardModalData(data);
              }
            }}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCarsMobile;
