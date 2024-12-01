// src/components/PlaylistManager.tsx
import { useState } from 'react';
import { YouTubeSearchResult } from '../types/youtube';
import { Playlist } from '../types/playlist';
import { createPlaylist, addVideoToPlaylist, getPlaylists } from '../utils/playlist';

interface PlaylistManagerProps {
    video: YouTubeSearchResult;
    onClose: () => void;
}

export function PlaylistManager({ video, onClose }: PlaylistManagerProps) {
    const [playlists, setPlaylists] = useState<Playlist[]>(getPlaylists);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreatePlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            const newPlaylist = createPlaylist(newPlaylistName.trim());
            setPlaylists([...playlists, newPlaylist]);
            setNewPlaylistName('');
            setIsCreating(false);
        }
    };

    const handleAddToPlaylist = (playlistId: string) => {
        addVideoToPlaylist(playlistId, video);
        setPlaylists(getPlaylists());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add to Playlist</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                {isCreating ? (
                    <form onSubmit={handleCreatePlaylist} className="mb-4">
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Playlist name"
                            className="w-full px-3 py-2 border rounded-lg mb-2"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
                    >
                        Create New Playlist
                    </button>
                )}

                <div className="space-y-2">
                    {playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">{playlist.name}</div>
                                <div className="text-sm text-gray-500">
                                    {playlist.videos.length} videos
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}