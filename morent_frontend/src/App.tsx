import { Route, Routes } from 'react-router-dom';

import { Checkout, Home, NotFound } from './pages';
import { NavBar, Footer } from './components';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full '>
      <NavBar />
      <div className='p-[2.5%] w-full bg-white-200'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
