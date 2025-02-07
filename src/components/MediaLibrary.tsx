import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { IoMdFolder } from "react-icons/io";
import { BsMusicNote } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";

interface MediaFile {
    path: string;
    name: string;
    isDirectory: boolean;
}

export default function MediaLibrary() {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [currentDirectory, setCurrentDirectory] = useState<string>('');
    const [directoryHistory, setDirectoryHistory] = useState<string[]>([]);

    useEffect(() => {
        loadMediaFiles();
    }, []);

    const loadMediaFiles = async () => {
        try {
            const files = await invoke('search_media_files', {
                searchPath: currentDirectory || '/'
            }) as string[];

            const formattedFiles = files.map(path => ({
                path,
                name: path.split('\\').pop() || path.split('/').pop() || '',
                isDirectory: !path.match(/\.(mp3|mp4|wav|flac|m4a|ogg)$/i)
            }));

            // Separate directories and files
            const directories = formattedFiles.filter(file => file.isDirectory);
            const mediaFiles = formattedFiles.filter(file => !file.isDirectory);
            
            // Sort alphabetically
            setMediaFiles([...directories.sort((a, b) => a.name.localeCompare(b.name)), 
                         ...mediaFiles.sort((a, b) => a.name.localeCompare(b.name))]);
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    };

    const handleFileClick = async (file: MediaFile) => {
        if (file.isDirectory) {
            setDirectoryHistory([...directoryHistory, currentDirectory]);
            setCurrentDirectory(file.path);
            await loadMediaFiles();
        } else {
            await invoke('play_media_file', { filePath: file.path });
        }
    };

    const handleBackClick = async () => {
        if (directoryHistory.length > 0) {
            const previousDirectory = directoryHistory[directoryHistory.length - 1];
            setDirectoryHistory(directoryHistory.slice(0, -1));
            setCurrentDirectory(previousDirectory);
            await loadMediaFiles();
        }
    };

    return (
        <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">Media Library</h2>
                    {currentDirectory && (
                        <button 
                            onClick={handleBackClick}
                            className="flex items-center px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
                        >
                            <MdArrowBack className="mr-2" /> Back
                        </button>
                    )}
                </div>

                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 mb-6">
                    <div className="text-gray-300 font-medium">
                        Current Location: {currentDirectory || 'Root Directory'}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaFiles.map((file, index) => (
                        <div
                            key={index}
                            onClick={() => handleFileClick(file)}
                            className="bg-gray-800/30 backdrop-blur rounded-xl p-4 hover:bg-gray-700/50 
                                     transition-all duration-300 cursor-pointer transform hover:scale-102"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-2xl bg-gray-700 p-3 rounded-lg">
                                    {file.isDirectory ? 
                                        <IoMdFolder className="text-yellow-400" size={24} /> : 
                                        <BsMusicNote className="text-blue-400" size={24} />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate">
                                        {file.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm truncate">
                                        {file.isDirectory ? 'Directory' : file.path.split('.').pop()?.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
