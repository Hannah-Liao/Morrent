import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { carShadow } from '../../assets/images/index';
import {
  gasStation,
  people,
  heartNoFill,
  heartFilled,
  transmission,
  edit,
} from '../../assets/icons/index';
import { CarDataInfo } from '../../types/carInfo';
import {
  useAddFavCarMutation,
  useDeleteFavCarMutation,
} from '../../services/api';
import { RootState } from '../../store/store';
import { openModal } from '../../slice/modalSlice';

interface CarCardProps {
  data: CarDataInfo | null;
  shouldOpenModal: boolean;
  hideButton?: boolean;
  editIcon?: boolean;
  afterFavClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({
  data,
  shouldOpenModal = false,
  hideButton = false,
  editIcon = false,
  afterFavClick,
}) => {
  const dispatch = useDispatch();
  const { userId, isLoggedIn } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const [addFavCar] = useAddFavCarMutation();
  const [deleteFavCar] = useDeleteFavCarMutation();

  if (!data) return;

  function lowerCase(str: string) {
    return str.toLowerCase();
  }

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='carCard'>
      <header className='flex justify-between items-start p-[24px] pb-3'>
        <div className='flex-1'>
          <h3 className='cardTitle capitalize'>{lowerCase(data.title)}</h3>
          <h4 className='cardSubtitle uppercase'>{data.carType}</h4>
        </div>
        {isLoggedIn && (
          <>
            {editIcon ? (
              <NavLink to={`/edit-car/${data._id}`}>
                <img
                  src={edit}
                  className='isFavoritedIcon'
                  alt='Edit Icon'
                  aria-label='Edit Icon'
                  onClick={goToTop}
                />
              </NavLink>
            ) : (
              <img
                src={data.isFavorited ? heartFilled : heartNoFill}
                className='isFavoritedIcon'
                alt='Red Heart Icon'
                aria-label='Red Heart Icon'
                onClick={() => {
                  const fn = data.isFavorited ? deleteFavCar : addFavCar;

                  fn({
                    carId: data['_id'],
                    userId,
                  }).then(() => {
                    if (afterFavClick) {
                      afterFavClick();
                    }
                  });
                }}
              />
            )}
          </>
        )}
      </header>

      <div className='flex justify-between items-center flex-col'>
        <div className='w-full lg:w-full mx-auto relative '>
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
            <span className='capitalize'>
              {lowerCase(data.transmissionType)}
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
                  dispatch(
                    openModal({
                      activeModalName: 'car_info',
                      modalData: data,
                    }),
                  );
                }
              }}
            >
              More Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
