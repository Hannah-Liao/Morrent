// import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../services/api';
import { EditProfileForm } from '../components';

const EditProfile = () => {
  const { data, isError, isFetching } = useGetUserByIdQuery();

  // Declined commenting code while merging
  // const { userID } = useSelector((state) => {
  //   return state.authSlice;
  // });
  // console.log('here', userID);

  if (isFetching) return <h1>loading</h1>;
  if (isError) return <h1>error</h1>;

  const userData = {
    address: data?.address,
    phoneNumber: data?.phoneNumber,
    name: data?.name,
    profileImage: data?.profileImage,
  };

  return <EditProfileForm userData={userData} />;
};

export default EditProfile;
