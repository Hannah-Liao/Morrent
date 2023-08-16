import { Route, Routes } from 'react-router-dom';

import { Checkout, Home, NotFound, ProfileDetail } from './pages';
import { NavBar, Footer } from './components';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full '>
      <NavBar />
      <div className='p-[2.5%] w-full bg-white-200 dark:bg-gray-900'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile/:id' element={<ProfileDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
