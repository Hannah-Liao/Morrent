import { Route, Routes } from 'react-router-dom';

import { Checkout, Home, NotFound, Search } from './pages';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto w-full h-full'>
      <div className='w-full h-full '>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
