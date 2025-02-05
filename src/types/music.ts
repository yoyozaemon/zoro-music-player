export interface Track {
    id: string;
    title: string;
    artist?: string;
    album?: string;
    duration?: number;
    path: string;
    thumbnail?: string;
}


export interface Playlist {
    id: string;
    name: string;
    tracks: Track[];
}

export interface MusicState {
    currentTrack: Track | null;
    queue: Track[];
    isPlaying: boolean;
    volume: number;
    playlists: Playlist[];
}

export type MusicAction =
    | { type: 'SET_TRACK'; payload: Track }
    | { type: 'SET_QUEUE'; payload: Track[] }
    | { type: 'ADD_TO_QUEUE'; payload: Track }
    | { type: 'REMOVE_FROM_QUEUE'; payload: string }
    | { type: 'TOGGLE_PLAY' }
    | { type: 'SET_VOLUME'; payload: number }
    | { type: 'SET_PLAYLISTS'; payload: Playlist[] }
    | { type: 'ADD_PLAYLIST'; payload: Playlist }
    | { type: 'UPDATE_PLAYLIST'; payload: Playlist }
    | { type: 'DELETE_PLAYLIST'; payload: string };
