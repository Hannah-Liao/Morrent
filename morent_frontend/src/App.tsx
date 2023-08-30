import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

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

// const getUser = async () => {
//   const response = await fetch('http://localhost:8004/api/user/current-user');
//   const user = await response.json();
//   console.log('here', user);
// };

const App = () => {
  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2.5%] pt-[124px] md:pt-[132px]'>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='add-car' element={<AddCar />} />
            <Route path='/edit-car/:id' element={<EditCar />} />
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
