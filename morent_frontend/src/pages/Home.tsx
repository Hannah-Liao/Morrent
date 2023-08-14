import CarCard from '../components/CarCard/CarCard';
import { cars } from '../constant/index';

const Home: React.FC = () => {
  return (
    <section className='py-3'>
      <div className='grid grid-cols-1 gap-x-8 gap-y-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
        {cars.map((car) => (
          <CarCard key={car.title} {...car} />
        ))}
      </div>
    </section>
  );
};

export default Home;
