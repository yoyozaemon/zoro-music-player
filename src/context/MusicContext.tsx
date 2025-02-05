import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Track, Playlist, MusicState, MusicAction } from '../types/music';

interface MusicContextType {
  state: MusicState;
  dispatch: React.Dispatch<MusicAction>;
}

const initialState: MusicState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 1,
  playlists: [],
};

const MusicContext = createContext<MusicContextType | null>(null);

function musicReducer(state: MusicState, action: MusicAction): MusicState {
  switch (action.type) {
    case 'SET_TRACK':
      return { 
        ...state, 
        currentTrack: action.payload,
        isPlaying: true 
      };

    case 'SET_QUEUE':
      return { 
        ...state, 
        queue: action.payload 
      };

    case 'ADD_TO_QUEUE':
      return { 
        ...state, 
        queue: [...state.queue, action.payload] 
      };

    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter(track => track.id !== action.payload)
      };

    case 'TOGGLE_PLAY':
      return { 
        ...state, 
        isPlaying: !state.isPlaying 
      };

    case 'SET_VOLUME':
      return { 
        ...state, 
        volume: Math.max(0, Math.min(1, action.payload)) 
      };

    case 'SET_PLAYLISTS':
      return { 
        ...state, 
        playlists: action.payload 
      };

    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: [...state.playlists, action.payload]
      };

    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.id ? action.payload : playlist
        )
      };

    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter(playlist => 
          playlist.id !== action.payload
        )
      };

    default:
      return state;
  }
}

interface MusicProviderProps {
  children: ReactNode;
}

export function MusicProvider({ children }: MusicProviderProps) {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  return (
    <MusicContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
}

// Utility functions to make state updates more convenient
export function useMusic() {
  const { state, dispatch } = useMusicContext();

  return {
    // Current state
    currentTrack: state.currentTrack,
    queue: state.queue,
    isPlaying: state.isPlaying,
    volume: state.volume,
    playlists: state.playlists,

    // Actions
    playTrack: (track: Track) => {
      dispatch({ type: 'SET_TRACK', payload: track });
    },

    setQueue: (tracks: Track[]) => {
      dispatch({ type: 'SET_QUEUE', payload: tracks });
    },

    addToQueue: (track: Track) => {
      dispatch({ type: 'ADD_TO_QUEUE', payload: track });
    },

    removeFromQueue: (trackId: string) => {
      dispatch({ type: 'REMOVE_FROM_QUEUE', payload: trackId });
    },

    togglePlay: () => {
      dispatch({ type: 'TOGGLE_PLAY' });
    },

    setVolume: (volume: number) => {
      dispatch({ type: 'SET_VOLUME', payload: volume });
    },

    setPlaylists: (playlists: Playlist[]) => {
      dispatch({ type: 'SET_PLAYLISTS', payload: playlists });
    },

    addPlaylist: (playlist: Playlist) => {
      dispatch({ type: 'ADD_PLAYLIST', payload: playlist });
    },

    updatePlaylist: (playlist: Playlist) => {
      dispatch({ type: 'UPDATE_PLAYLIST', payload: playlist });
    },

    deletePlaylist: (playlistId: string) => {
      dispatch({ type: 'DELETE_PLAYLIST', payload: playlistId });
    }
  };
}