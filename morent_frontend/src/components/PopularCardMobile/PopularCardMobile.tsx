import { useState } from 'react';

import { carShadow } from '../../assets/images/index';
import {
  gasStation,
  people,
  heartNoFill,
  heartFilled,
  transmission,
} from '../../assets/icons/index';
import { capitalizeCarType } from '../../lib/utils';

interface CarCardProps {
  title: string;
  carType: string;
  carImage: string;
  fuelTankSize: number;
  transmissionType: string;
  numberOfPeople: number;
  price: number;
  discountPrice: number;
  buttonText: string;
}

const PopularCardMobile: React.FC<CarCardProps> = ({
  title,
  carType,
  carImage,
  fuelTankSize,
  transmissionType,
  numberOfPeople,
  price,
  discountPrice,
  buttonText,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className='cardContainer'>
      <header className='flex justify-between p-[16px] sm:px-[24px]'>
        <div className='flex-3 w-[90%] overflow-hidden'>
          <h3 className='cardTitle'>{title}</h3>
          <h4 className='cardSubtitle'>{carType}</h4>
        </div>
        <div className='flex-1'>
          <img
            src={isFavorited ? heartFilled : heartNoFill}
            className='isFavoritedIcon'
            alt='Red Heart Icon'
            onClick={() =>
              setIsFavorited((prevIsFavorited) => !prevIsFavorited)
            }
          />
        </div>
      </header>

      {/* Car Image and Icons */}
      <div className='flex justify-between items-center flex-col'>
        {/* Car Image with Shadow*/}
        <div className='w-full lg:w-full mx-auto py-[20px] lg:py-[40px]'>
          <div
            style={{ backgroundImage: `url(${carImage})` }}
            className='cardImage'
          >
            <div className='mt-10 dark:opacity-0'>
              <img
                className='h-[64px] w-full opacity:90'
                src={carShadow}
                alt='Shadow overlay'
              />
            </div>
          </div>
        </div>

        {/* Icons */}
        <ul className='cardIconContainer flex-row w-full mb-2 body-medium px-[16px] sm:px-[24px]'>
          <li className='cardIconItem'>
            <img src={gasStation} alt='Gas Station Icon' className='cardIcon' />
            <span>{fuelTankSize}L</span>
          </li>
          <li className='cardIconItem'>
            <img
              src={transmission}
              alt='Transmission Icon'
              className='cardIcon'
            />
            <span>{capitalizeCarType(transmissionType)}</span>
          </li>
          <li className='cardIconItem'>
            <img src={people} alt='People Icon' className='cardIcon' />
            <span>{numberOfPeople} People</span>
          </li>
        </ul>
      </div>

      {/* Price and Button */}
      <div className='flex justify-between align-center p-[16px] sm:p-[24px]'>
        <div className='flex-1'>
          <h3 className='cardPrice'>
            ${price}.00 /{' '}
            <span className='small-regular md:body-bold text-gray-400'>
              day
            </span>
          </h3>
          <h4 className='cardDiscountedPrice'>${discountPrice}.00</h4>
        </div>
        <div className='flex-1 text-right'>
          <button type='button' className='cardButton lg:text-[14px]'>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCardMobile;
