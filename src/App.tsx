import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import MobileView from './pages/MobileView';
import VideoModeScreen from './pages/VideoModeScreen';
function App() {
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto' />

      <Routes>
        <Route path="/" element={<MobileView />} />
        <Route path="/video-mode" element={<VideoModeScreen />} />

      </Routes>
    </>
  );
}

export default App;
