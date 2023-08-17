import CarCard from './CarCard/CarCard';
import { cars } from '../constant/index';

const CarsDispalySection = () => {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
      {cars.map((car) => (
        <CarCard key={car.title} {...car} />
      ))}
    </div>
  );
};

export default CarsDispalySection;
