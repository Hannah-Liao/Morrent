import { useDispatch, useSelector } from 'react-redux';
import { carShadow } from '../../assets/images/index';
import {
  gasStation,
  people,
  heartNoFill,
  heartFilled,
  transmission,
} from '../../assets/icons/index';
import { CarDataInfo } from '../../types/carInfo';
import { openModal } from '../../slice/modalSlice';
import { RootState } from '../../store/store';
import {
  useAddFavCarMutation,
  useDeleteFavCarMutation,
} from '../../services/api';

interface CarCardProps {
  data: CarDataInfo | null;
  isHidden?: boolean;
  shouldOpenModal: boolean;
  afterFavClick?: () => void;
}

const PopularCarsMobile: React.FC<CarCardProps> = ({
  data,
  isHidden,
  shouldOpenModal = false,
  afterFavClick,
}) => {
  const [addFavCar] = useAddFavCarMutation();
  const [deleteFavCar] = useDeleteFavCarMutation();
  const { userId, isLoggedIn } = useSelector(
    (state: RootState) => state.userInfo,
  );
  const dispatch = useDispatch();

  if (!data) return;

  function lowerCase(str: string) {
    return str.toLowerCase();
  }

  return (
    <div
      className={`popularCard  ${
        isHidden ? 'blur-xs' : ''
      } popularCarCard fadeIn`}
    >
      <header className='flex justify-between p-[16px] sm:p-[24px]'>
        <div className='flex-3 w-[90%] overflow-hidden'>
          <h3 className='cardTitle capitalize'>{lowerCase(data?.title)}</h3>
          <h4 className='cardSubtitle'>{data?.carType}</h4>
        </div>

        <div className='flex-1'>
          {isLoggedIn && (
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
      </div>
    </div>
  );
};

export default PopularCarsMobile;
