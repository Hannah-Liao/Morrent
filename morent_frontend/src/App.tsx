import { Route, Routes } from 'react-router-dom';

import { Checkout, Home, NotFound } from './pages';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full'>
      <div className='p-[2.5%] w-full'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
