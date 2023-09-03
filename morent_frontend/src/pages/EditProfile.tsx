// import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../services/api';
import { EditProfileForm, Loader, ServerError } from '../components';

const EditProfile = () => {
  const { data, isError, isFetching } = useGetUserByIdQuery();

  if (isFetching) return <Loader />;
  if (isError) return <ServerError />;

  const userData = {
    address: data?.address,
    phoneNumber: data?.phoneNumber,
    name: data?.name,
    profileImage: data?.profileImage,
  };

  return <EditProfileForm userData={userData} />;
};

export default EditProfile;
