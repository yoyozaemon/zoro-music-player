import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NowPlaying from './NowPlaying';

export default function MainLayout() {
  return (
    <div className="h-screen w-screen flex bg-background text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <NowPlaying />
      </div>
    </div>
  );
}
