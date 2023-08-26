import { useParams } from 'react-router-dom';

import { CarForm } from '../components';

const EditCar = () => {
  const { id } = useParams();

  return <CarForm isEditCarPage={true} carID={id} />;
};

export default EditCar;
