import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Canceled,
  Checkout,
  Home,
  NotFoundPage,
  Search,
  Success,
  ProfileDetail,
  AddCar,
  SignUp,
  EditProfile,
  EditCar,
  Login,
  Failed,
} from './pages';
import { NavBar, Footer, CarInfoModal, RentNowModal } from './components';
import { useLazyGetCurrentUserQuery } from './services/api';
import { updateLogin } from './slice/loginSlice';
import { RootState } from './store/store';
import { CarDataInfo } from './types/carInfo';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector((state: RootState) => state.modalInfo);

  const [getCurrentUser] = useLazyGetCurrentUserQuery({});

  useEffect(() => {
    async function validateCurrentUser() {
      const currentUser = await getCurrentUser({});
      if (currentUser?.data?.userId) {
        dispatch(
          updateLogin({
            userId: currentUser.data.userId,
            isLoggedIn: true,
          }),
        );
      }
    }
    validateCurrentUser();
  }, []);

  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2%]'>
          <Routes>
            <Route
              path='add-car'
              element={
                <ProtectedRoutes>
                  <AddCar />
                </ProtectedRoutes>
              }
            />

            <Route
              index
              path='/'
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/checkout'
              element={
                <ProtectedRoutes>
                  <Checkout />
                </ProtectedRoutes>
              }
            />

            <Route
              path='/edit-car/:id'
              element={
                <ProtectedRoutes>
                  <EditCar />
                </ProtectedRoutes>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/search' element={<Search />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Canceled />} />
            <Route path='/error' element={<Failed />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/profile' element={<ProfileDetail />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer />

      {/* Car Info Modal */}
      <CarInfoModal
        open={modalInfo.activeModalName === 'car_info'}
        data={modalInfo.modalData as CarDataInfo}
      />

      {/* Rent Now Modal */}
      <RentNowModal open={modalInfo.activeModalName === 'rent'} />
    </main>
  );
};

export default App;
