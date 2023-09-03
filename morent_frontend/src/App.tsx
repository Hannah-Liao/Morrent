import { Route, Routes } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import {useDispatch, useSelector} from 'react-redux';

import {
  Canceled,
  Checkout,
  Home,
  NotFound,
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
import { NavBar, Footer } from './components';
// import { setCurrentUser } from './slice/authSlice';
import ProtectedRoutes from './utils/ProtectedRoutes';
// import { RootState } from './store/store';

const App = () => {
  // const dispatch = useDispatch();
  // const { userID } = useSelector((state: RootState) => {
  // return state.authSlice;
  // });

  // const [user, setUser] = useState(userID);
  // console.log(userID, 'UserID');

  // const { isLoggedIn, userId } = useSelector(
  //   (state: { userInfo: { isLoggedIn: boolean; userId: string } }) => {
  //     console.log(state.userInfo, 'test');
  //     return state.userInfo;
  //   },
  // );

  // dispatch(
  //   setCurrentUser({
  //     userID: user,
  //   }),
  // );

  // const getUser = async () => {
  //   try {
  //     const res = await fetch('http://localhost:8004/api/user/current-user', {
  //       credentials: 'include',
  //     });
  //     const data = await res.json();
  //     setUser(data.userID);
  //     console.log(data);
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };

  // useEffect(() => {
  //   getUser().then((userData) => {
  //     dispatch(setCurrentUser({ userID: userData }));
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2.5%] pt-[124px] md:pt-[132px]'>
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
            <Route path='/search' element={<Search />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Canceled />} />
            <Route path='/error' element={<Failed />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/profile/:id' element={<ProfileDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default App;
