import { Route, Routes } from 'react-router-dom';

import { Checkout, Home, NotFound, ProfileDetail } from './pages';
import { NavBar, Footer } from './components';

function App() {
  return (
    <main>
      <NavBar />
      <div className='w-full bg-white-200 dark:bg-gray-900'>
        <div className='w-full max-container p-[2%]'>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/checkout' element={<Checkout />} />
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
