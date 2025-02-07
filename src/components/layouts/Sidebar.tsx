import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ListMusic, Settings, Rewind, FolderOpen } from 'lucide-react';
import zoroIcon from '../../assets/icon.png';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: FolderOpen, label: 'Local Files', path: '/local' },
  { icon: ListMusic, label: 'Playlists', path: '/playlists' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-surface p-4">
      <div className="flex items-center mb-8">
        <img
          src={zoroIcon}
          alt="Zoro Music Icon"
          className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
        />
        <h1 className="gap-2 ml-1.5 text-2xl font-bold text-primary">Zoro Music</h1>
      </div>
      <nav className="space-y-2">
        <button
          onClick={() => handleNavigation('/intro')}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-white hover:bg-gray-700"
        >
          <Rewind size={20} />
          <span>Replay Intro</span>
        </button>

        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => handleNavigation(path)}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
              ${location.pathname === path
                ? 'bg-primary text-white'
                : 'text-white hover:bg-gray-700'}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}