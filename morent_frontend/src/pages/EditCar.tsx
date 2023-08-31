import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

import { CarForm } from '../components';
import { useGetSingleCarQuery } from '../services/api';

const EditCar = () => {
  const { id } = useParams();
  // const [existImages, setExistImages] = useState<
  //   Array<{ url: string; file: File | null }>
  // >([]);

  const { data, isError, isFetching } = useGetSingleCarQuery(id);

  // useEffect(() => {
  //   const url2: Array<{ url: string; file: File | null }> = [];
  //   data?.data.carImages?.map((Iurl: string) =>
  //     url2.push({ url: Iurl, file: null }),
  //   );
  //   setExistImages(url2);
  // }, [data]);

  if (isFetching) return <h1>Loading</h1>;
  if (isError) return <h1>error</h1>;

  return (
    <CarForm
      isEditCarPage={true}
      carID={id}
      carData={data.data}
      // existImages={existImages}
      // setExistImages={setExistImages}
    />
  );
};

export default EditCar;
