import { useMusic } from '../../context/MusicContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function NowPlaying() {
  const { currentTrack, isPlaying, volume, togglePlay, setVolume } = useMusic();

  if (!currentTrack) return null;

  return (
    <div className="h-20 bg-gray-800 border-t border-gray-700 p-4 flex items-center">
      <div className="flex items-center flex-1">
        <img 
          src={currentTrack.thumbnail} 
          alt={currentTrack.title}
          className="w-12 h-12 rounded"
        />
        <div className="ml-4">
          <div className="font-medium">{currentTrack.title}</div>
          <div className="text-sm text-gray-400">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <SkipBack size={20} />
        </button>
        <button 
          className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="flex items-center ml-8">
        <Volume2 size={20} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="ml-2 w-24"
        />
      </div>
    </div>
  );
}
