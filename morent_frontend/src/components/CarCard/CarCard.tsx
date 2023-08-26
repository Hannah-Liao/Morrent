import { Dispatch, SetStateAction, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { carShadow } from '../../assets/images/index';
import {
  gasStation,
  people,
  heartNoFill,
  heartFilled,
  transmission,
  edit,
} from '../../assets/icons/index';
import { CarInfo } from '../../types/carInfo';

interface CarCardProps {
  data: CarInfo | null;
  setCardModalData: Dispatch<SetStateAction<CarInfo | null>>;
  setIsCarModalOpen: Dispatch<SetStateAction<boolean>>;
  shouldOpenModal: boolean;
  hideButton?: boolean;
  editIcon?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  data,
  setCardModalData,
  setIsCarModalOpen,
  shouldOpenModal = false,
  hideButton = false,
  editIcon = false,
}) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  if (!data) return;

  return (
    <div className='cardContainer'>
      {/* Card Title Section */}
      <header className='flex justify-between items-start p-[24px] pb-0'>
        <div className='flex-1'>
          <h3 className='cardTitle'>{data.title}</h3>
          <h4 className='cardSubtitle'>{data.carType}</h4>
        </div>
        {editIcon ? (
          <NavLink to='/edit-car'>
            <img
              src={edit}
              className='isFavoritedIcon'
              alt='Edit Icon'
              aria-label='Edit Icon'
            />
          </NavLink>
        ) : (
          <img
            src={isFavorited ? heartFilled : heartNoFill}
            className='isFavoritedIcon'
            alt='Red Heart Icon'
            aria-label='Red Heart Icon'
            onClick={() =>
              setIsFavorited((prevIsFavorited) => !prevIsFavorited)
            }
          />
        )}
      </header>

      {/* Car Image and Stats Section */}
      <div className='flex justify-between items-center lg:flex-col'>
        {/* Car Image with Shadow*/}
        <div className='basis-2/3 lg:w-full mx-auto py-[20px] lg:py-[40px]'>
          <div
            style={{ backgroundImage: `url(${data.carImages[0]})` }}
            className='cardImage'
          >
            <div className='mt-10 dark:opacity-0'>
              <img
                className='h-[64px] w-full'
                src={carShadow}
                alt='Shadow overlay'
              />
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <ul className='cardIconContainer'>
          <li className='cardIconItem'>
            <img src={gasStation} alt='Gas Station Icon' className='cardIcon' />
            <span>{data.fuelTankSize}L</span>
          </li>
          <li className='cardIconItem'>
            <img
              src={transmission}
              alt='Transmission Icon'
              className='cardIcon'
            />
            <span className='first-letter:capitalize'>
              {data.transmissionType}
            </span>
          </li>
          <li className='cardIconItem'>
            <img src={people} alt='People Icon' className='cardIcon' />
            <span>
              {data.capacity > 1
                ? `${data.capacity} People`
                : `${data.capacity} Person`}
            </span>
          </li>
        </ul>
      </div>

      {/* Price Section*/}
      <div className='flex justify-between align-center p-[24px]'>
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
          {data.discountPrice && data.discountPrice > 0 && (
            <h4
              className='cardDiscountedPrice'
              title={`${data.discountPrice}.00 / day`}
            >
              ${data.discountPrice}.00
            </h4>
          )}
        </div>
        {/* Button */}
        {!hideButton && (
          <div className='flex-1 text-right'>
            <button
              className='cardButton'
              onClick={() => {
                if (shouldOpenModal) {
                  setIsCarModalOpen(true);
                  setCardModalData(data);
                }
              }}
            >
              {data.buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
