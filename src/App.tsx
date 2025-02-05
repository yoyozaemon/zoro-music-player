import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/core';
import IntroScreen from './components/IntroScreen';
import MainLayout from './components/layouts/MainLayout';
import Search from './components/Search';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await invoke('init_app');
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleIntroComplete = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/intro" element={<IntroScreen onComplete={handleIntroComplete} />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
}
export default App;