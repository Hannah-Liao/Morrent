import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

import { blueBackground } from '../../assets/images/index';
import { starFilled, starNoFill } from '../../assets/icons';
import { CarInfo } from '../../types/carInfo';

interface CarInfoModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CarInfo | null;
}

const CarInfoModal: React.FC<CarInfoModalProps> = ({ open, setOpen, data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<null | number>(1);

  function selectLargeImage(activeImageIndex: number | null) {
    switch (activeImageIndex) {
      case 1:
        return data?.carImages[0];
      case 2:
        return data?.carImages[1];
      case 3:
        return data?.carImages[2];
      default:
        return data?.carImages[0];
    }
  }

  if (!data) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[1054px] md:max-h-[560px] p-0 dark:bg-gray-850 rounded-xl w-[90%]'>
        <section
          id='carInfoModal'
          className=' mx-auto flex flex-col justify-between sm:flex-row gap-2 md:gap-6 p-2'
        >
          {/* Column 1 */}
          <div className='flex-1 basis-1/2 flex flex-col justify-between p-2 md:p-4 gap-2 md:gap-6'>
            {/* {Big Image} */}
            <div className='flex-1 basis-3/4 max-h-[232px] md:max-h-[360px]'>
              <img
                src={selectLargeImage(activeImageIndex)}
                alt='Car View 1 Large'
                style={{ backgroundImage: `url(${blueBackground})` }}
                className='w-full h-full object-contain rounded-[10px]'
                aria-label='Large car image'
              />
            </div>
            {/* Small Images */}
            <ul className='flex-1 basis-1/4 flex justify-between gap-1 lg:gap-6'>
              <li
                className={`max-h-[128px] flex-1 basis-1/3 rounded-[10px] ${
                  activeImageIndex === 1
                    ? `p-2 border-2 border-blue-500 ease-out duration-150`
                    : 'p-2 border-2 border-transparent'
                }`}
              >
                {data.carImages[0] ? (
                  <img
                    src={data.carImages[0]}
                    alt='Car View 1 Small'
                    aria-label='Car View 1 Small'
                    style={{ backgroundImage: `url(${blueBackground})` }}
                    className='w-full h-full object-contain rounded-[10px] cursor-pointer'
                    onClick={() => setActiveImageIndex(1)}
                  />
                ) : (
                  <div
                    style={{ backgroundImage: `url(${blueBackground})` }}
                    className='flex justify-center items-center bg-no-repeat bg-center rounded-[10px] w-full text-center'
                  >
                    <h2 className='flex-1 text-white p-5 text-xs'>No Image</h2>
                  </div>
                )}
              </li>
              <li
                className={`max-h-[128px] flex-1 basis-1/3 rounded-[10px] ${
                  activeImageIndex === 2
                    ? `p-2 border-2 border-blue-500 ease-out duration-150`
                    : 'p-2 border-2 border-transparent'
                }`}
              >
                {data.carImages[1] ? (
                  <img
                    src={data?.carImages[1]}
                    alt='Car View 2'
                    aria-label='Car View 2'
                    className='w-full h-full object-cover rounded-[10px] cursor-pointer'
                    onClick={() => setActiveImageIndex(2)}
                  />
                ) : (
                  <div
                    style={{ backgroundImage: `url(${blueBackground})` }}
                    className='flex justify-center items-center bg-no-repeat bg-center rounded-[10px] w-full h-full text-center'
                  >
                    <h2 className='flex-1 text-white p-5 text-xs'>No Image</h2>
                  </div>
                )}
              </li>
              <li
                className={`max-h-[128px] flex-1 basis-1/3 rounded-[10px] ${
                  activeImageIndex === 3
                    ? `p-2 border-2 border-blue-500 ease-out duration-150`
                    : 'p-2 border-2 border-transparent'
                }`}
              >
                {data.carImages[2] ? (
                  <img
                    src={data?.carImages[2]}
                    alt='Car View 3'
                    aria-label='Car View 3'
                    className='w-full h-full object-cover rounded-[10px] cursor-pointer'
                    onClick={() => setActiveImageIndex(3)}
                  />
                ) : (
                  <div
                    style={{ backgroundImage: `url(${blueBackground})` }}
                    className='flex justify-center items-center bg-no-repeat bg-center rounded-[10px] w-full h-full text-center'
                  >
                    <h2 className='flex-1 text-white p-5 text-xs'>No Image</h2>
                  </div>
                )}
              </li>
            </ul>
          </div>
          {/* Column 2 */}
          <div className='flex-2 basis-1/2 p-4 md:p-6'>
            <header className='flex justify-between'>
              <div className='flex-3 basis-3/4 overflow-hidden '>
                <h3 className='carInfoModalTitle'>{data.title}</h3>
                <div className='flex justify-start items-center'>
                  <div className='flex justify-start items-center'>
                    {[1, 2, 3, 4, 5].map((noOfStars) => (
                      <img
                        key={noOfStars}
                        src={
                          noOfStars <= data?.rating ? starFilled : starNoFill
                        }
                        className='w-[12px] h-[12px] md:w-[20px] sm:h-[20px] p-[2px]'
                        alt='Stars'
                        aria-label='Stars'
                      />
                    ))}
                  </div>
                  <h4 className='small-regular md:body-medium text-gray-700 dark:text-white-200 ml-[8px]'>
                    {data.reviews}+ Reviews
                  </h4>
                </div>
              </div>
            </header>

            {/* Description */}
            <div>
              <p className='carModalDescription'>{data.description}</p>
            </div>

            {/* Stats */}
            <div className='statsContainer'>
              {/* Stats - Column 1 */}
              <div className='flex-1 basis-1/2'>
                <div className='flex md:mb-4 mb-2'>
                  <h3 className='statsTitle'>Type Car</h3>
                  <h4 className='statsSubtitle'>{data.carType}</h4>
                </div>
                <div className='flex'>
                  <h3 className='statsTitle'>Transm.</h3>
                  <h4 className='statsSubtitle'>{data.transmissionType}</h4>
                </div>
              </div>

              {/* Stats - Column 2 */}
              <div className='flex-1 basis-1/2 pt-0'>
                <div className='flex md:mb-4 mb-2'>
                  <h3 className='statsTitle'>Capacity</h3>
                  <h4 className='statsSubtitle'>
                    {data.capacity > 1
                      ? `${data.capacity} People`
                      : `${data.capacity} Person`}
                  </h4>
                </div>
                <div className='flex'>
                  <h3 className='statsTitle'>Gasoline</h3>
                  <h4 className='statsSubtitle'>{data.fuelTankSize}L</h4>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className='flex justify-between align-center py-[16px] md:py-[32px]'>
              {/* Price */}
              <div className='flex-1 hidden sm:block pr-2'>
                <h3
                  className={
                    data.discountPrice > 0
                      ? 'cardPrice md:text-[28px]'
                      : 'cardPrice md:text-[28px] mt-[10px]'
                  }
                  title={`${data?.price}.00 / day`}
                >
                  ${data.price}.00 /{' '}
                  <span className='text-[16px] font-bold text-gray-400'>
                    day
                  </span>
                </h3>
                {data.discountPrice > 0 && (
                  <h4
                    className='cardDiscountedPrice text-[16px]'
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
                  className='cardButton text-[14px] font-bold md:text-[16px] w-full md:min-w-[140px]'
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CarInfoModal;
