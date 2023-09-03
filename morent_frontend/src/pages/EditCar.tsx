import { useParams } from 'react-router-dom';

import { CarForm, Loader, ServerError } from '../components';
import { useGetSingleCarQuery } from '../services/api';

const EditCar = () => {
  const { id } = useParams();

  const { data, isError, isFetching } = useGetSingleCarQuery(id);

  if (isFetching) return <Loader />;
  if (isError) return <ServerError />;

  return <CarForm isEditCarPage={true} carID={id} carData={data.data} />;
};

export default EditCar;
