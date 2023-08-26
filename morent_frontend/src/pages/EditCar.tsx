import { useParams } from 'react-router-dom';

import { CarForm } from '../components';
import { useGetSingleCarQuery } from '../services/api';

const EditCar = () => {
  const { id } = useParams();

  const { data, isError, isFetching } = useGetSingleCarQuery(id);

  if (isFetching) return <h1>Loading</h1>;
  if (isError) return <h1>error</h1>;

  return <CarForm isEditCarPage={true} carID={id} data={data.data} />;
};

export default EditCar;
