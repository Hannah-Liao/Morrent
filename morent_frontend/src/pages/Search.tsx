import { useState } from 'react';
import { Filter, PickDropForm } from '../components';
import CarCard from '../components/CarCard/CarCard';
import SearchInput from '../components/SearchInput/SearchInput';
import car from '../assets/images/anotherCar.png';

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex min-h-screen flex-col md:flex-row gap-5 p-2 md:p-0 w-full'>
      <section
        className={`fixed z-10 md:sticky transition-all ease duration-500 top-0 md:h-screen md:max-w-[260px] bg-white h-screen dark:bg-gray-900 w-full overflow-y-auto p-5 ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Filter setIsOpen={setIsOpen} />
      </section>
      <div className='w-full'>
        <div className='md:hidden'>
          <SearchInput setIsOpen={setIsOpen} />
        </div>
        <PickDropForm isShow={false} />
        <section className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 1xl:grid-cols-2 xl:grid-cols-3   gap-8 justify-center pt-9'>
          {[1, 2, 3, 4, 5, 6, 7].map((card) => (
            <div key={card} className=' w-full sm:max-w-xs md:max-w-full'>
              <CarCard
                buttonText='More Info'
                carImage={car}
                carType='Sport '
                discountPrice={50}
                fuelTankSize={100}
                numberOfPeople={2}
                price={100}
                title='Koenigsegg'
                transmissionType='manual'
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
