import { Route, Routes } from 'react-router-dom';

import { AddCar, Checkout, Home, NotFound } from './pages';
import { NavBar, Footer } from './components';
import ShadCnForm from './pages/ShadCnForm';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full '>
      <NavBar />
      <div className='p-[2.5%] w-full bg-white-200 dark:bg-gray-900'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/add-car' element={<AddCar />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/test-page' element={<ShadCnForm />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
