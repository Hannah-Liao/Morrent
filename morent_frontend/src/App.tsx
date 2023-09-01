import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  useDispatch,
  // useSelector
} from 'react-redux';

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
import { setCurrentUser } from './slice/authSlice';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  // const { userID } = useSelector((state) => {
  //   return state.authSlice;
  // });
  // console.log(userID);

  // const logIn = () => {
  //   setIsLoggedIn(true);
  // };
  // const logOut = () => {
  //   setIsLoggedIn(false);
  // };

  dispatch(
    setCurrentUser({
      userID: user,
    }),
  );

  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:8004/api/user/current-user', {
        credentials: 'include',
      });
      const data = await res.json();

      setUser(data);
    } catch (error) {
      // console.log(error);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2.5%] pt-[124px] md:pt-[132px]'>
          <Routes>
            <Route
              path='add-car'
              element={
                <ProtectedRoutes isLoggedIn={isLoggedIn}>
                  <AddCar />
                </ProtectedRoutes>
              }
            />

            <Route
              index
              path='/'
              element={
                <ProtectedRoutes isLoggedIn={isLoggedIn}>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/checkout'
              element={
                <ProtectedRoutes isLoggedIn={isLoggedIn}>
                  <Checkout />
                </ProtectedRoutes>
              }
            />

            <Route
              path='/edit-car/:id'
              element={
                <ProtectedRoutes isLoggedIn={isLoggedIn}>
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
