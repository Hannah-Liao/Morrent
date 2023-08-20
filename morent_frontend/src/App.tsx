import { Route, Routes } from 'react-router-dom';

import {
  Canceled,
  Checkout,
  Failed,
  Home,
  NotFound,
  Search,
  Success,
  ProfileDetail,
  AddCar,
} from './pages';
import { NavBar, Footer } from './components';
function App() {
  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2.5%] pt-[124px] md:pt-[132px]'>
          <Routes>
            <Route index path='/' element={<Home />} />
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
