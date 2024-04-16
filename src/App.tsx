import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import MobileView from './pages/MobileView';
import VideoModeScreen from './pages/VideoModeScreen';
import ConsentView from './pages/ConsentView'
import PhotoModeScreen from './pages/PhotoModeScreen';
import PoseScreen from './pages/PoseDetect';
import DocModeScreen from './pages/DocModeScreen';

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
        <Route path="/mobile" element={<MobileView />} />
        <Route path="/" element={<ConsentView />} />

        <Route path="/video-mode" element={<VideoModeScreen />} />
        <Route path="/photo-mode" element={<PhotoModeScreen />} />
        <Route path="/doc-mode" element={<DocModeScreen />} />

        <Route path="/test" element={<PoseScreen />} />



      </Routes>
    </>
  );
}

export default App;
