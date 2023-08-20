import { FC, useState } from 'react';
import { cars } from '../constant';
import { CarCard, CarInfoModal, RentNowModal } from '../components';
import { CarInfo } from '../types/carInfo';

type props = {
  editIcon?: boolean;
  hideButton?: boolean;
};

const CarsDispalySection: FC<props> = ({ editIcon, hideButton }) => {
  const [cardModalData, setCardModalData] = useState<null | CarInfo>(null);
  const [openModalName, setOpenModalName] = useState<'car_info' | 'rent' | ''>(
    '',
  );

  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0'>
      {cars.slice(0, 4).map((car, i) => (
        <CarCard
          key={i}
          data={car}
          setCardModalData={setCardModalData}
          setIsCarModalOpen={() => setOpenModalName('car_info')}
          editIcon={editIcon}
          shouldOpenModal={true}
          hideButton={hideButton}
        />
      ))}
      {/* Car Info Modal */}
      <CarInfoModal
        open={openModalName === 'car_info'}
        setOpen={setOpenModalName}
        data={cardModalData}
      />

      {/* Rent Now Modal */}
      <RentNowModal
        open={openModalName === 'rent'}
        setOpen={setOpenModalName}
      />
    </div>
  );
};

export default CarsDispalySection;
