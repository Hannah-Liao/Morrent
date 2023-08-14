import { Route, Routes } from 'react-router-dom';

import {
  Canceled,
  Checkout,
  Failed,
  Home,
  NotFound,
  Search,
  Success,
} from './pages';
import { NavBar, Footer } from './components';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full '>
      <NavBar />
      <div className='p-[2.5%] w-full bg-white-200 dark:bg-gray-900'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Canceled />} />
          <Route path='/error' element={<Failed />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
