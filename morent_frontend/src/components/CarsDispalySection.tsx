import { FC } from 'react';
import { CarCard } from '../components';
import { CarDataInfo } from '../types/carInfo';

type props = {
  editIcon?: boolean;
  hideButton?: boolean;
  carsData?: CarDataInfo[];
  afterFavClick?: () => void;
};

const CarsDispalySection: FC<props> = ({
  editIcon,
  hideButton,
  carsData,
  afterFavClick,
}) => {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
      {carsData ? (
        carsData
          .slice(0, 4)
          .map((car) => (
            <CarCard
              key={car.title}
              data={car}
              editIcon={editIcon}
              shouldOpenModal={true}
              hideButton={hideButton}
              afterFavClick={afterFavClick}
            />
          ))
      ) : (
        <p className='text-xs'>No cars to show</p>
      )}
    </div>
  );
};

export default CarsDispalySection;
