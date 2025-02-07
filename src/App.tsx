import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/core';
import IntroScreen from './components/IntroScreen';
import MainLayout from './components/layouts/MainLayout';
import Search from './components/Search';
import MediaLibrary from './components/MediaLibrary';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await invoke('init_app');
        const files = await invoke('find_media_files', { searchPath: '/' });
        setMediaFiles(files);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/intro" element={<IntroScreen onComplete={() => window.location.href = '/'} />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="search" element={<Search />} />
        <Route path="local" element={<MediaLibrary files={mediaFiles} />} />
      </Route>
    </Routes>
  );
}
export default App;