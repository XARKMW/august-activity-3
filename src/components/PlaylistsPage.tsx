// src/components/PlaylistsPage.tsx
import { useState, useEffect } from 'react';
import { Playlist } from '../types/playlist';
import { getPlaylists, deletePlaylist, removeVideoFromPlaylist } from '../utils/playlist';

export default function PlaylistsPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        setPlaylists(getPlaylists());
    }, []);

    const handleDeletePlaylist = (playlistId: string) => {
        deletePlaylist(playlistId);
        setPlaylists(getPlaylists());
    };

    const handleRemoveVideo = (playlistId: string, videoId: string) => {
        removeVideoFromPlaylist(playlistId, videoId);
        setPlaylists(getPlaylists());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Playlists</h1>

            <div className="grid gap-6">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="bg-white rounded-lg shadow-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-bold">{playlist.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {playlist.videos.length} videos
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeletePlaylist(playlist.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete Playlist
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {playlist.videos.map(video => (
                                <div
                                    key={video.id}
                                    className="flex gap-3 items-center"
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{video.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {video.channelTitle}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveVideo(playlist.id, video.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}