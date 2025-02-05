import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Search as SearchIcon } from 'lucide-react';
import { useMusic } from '../context/MusicContext';


export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useMusic();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await invoke('search_media', { query });
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = (track) => {
    dispatch({ type: 'SET_TRACK', payload: track });
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <SearchIcon 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, or paste a link..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((track) => (
          <div 
            key={track.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
          >
            <img 
              src={track.thumbnail} 
              alt={track.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium mb-1">{track.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{track.artist}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => playTrack(track)}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Play
                </button>
                <button
                  onClick={() => dispatch({ 
                    type: 'ADD_TO_QUEUE', 
                    payload: track 
                  })}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Add to Queue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;