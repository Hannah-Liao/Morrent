import { Route, Routes } from 'react-router-dom';

import {
  Canceled,
  Checkout,
  Home,
  NotFound,
  Search,
  Success,
  ProfileDetail,
  AddCar,
  Failed,
  Login,
} from './pages';
import { NavBar, Footer } from './components';

function App() {
  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2.5%]'>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='add-car' element={<AddCar />} />
            <Route path='/search' element={<Search />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Canceled />} />
            <Route path='/error' element={<Failed />} />
            <Route path='/profile/:id' element={<ProfileDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
