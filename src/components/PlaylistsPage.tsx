import { useState, useEffect } from 'react';
import { Playlist } from '../types/playlist';
import { getPlaylists, deletePlaylist, removeVideoFromPlaylist } from '../utils/playlist';
import { Tabs } from "../ui/Tabs";
import { Button } from "@/ui/button.tsx";

interface PlaylistsPageProps {
    onVideoSelect: (videoId: string) => void;
}

export default function PlaylistsPage({ onVideoSelect }: PlaylistsPageProps) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        setPlaylists(getPlaylists());
    }, []);

    const handleDeletePlaylist = (playlistId: string) => {
        deletePlaylist(playlistId);
        setPlaylists(getPlaylists());
    };

    const handleRemoveVideo = (e: React.MouseEvent, playlistId: string, videoId: string) => {
        e.stopPropagation(); // Prevent video selection when removing
        removeVideoFromPlaylist(playlistId, videoId);
        setPlaylists(getPlaylists());
    };

    const PlaylistContent = ({ playlist }: { playlist: Playlist }) => (
        <div className="w-full overflow-hidden relative h-full rounded-lg bg-white border border-border min-h-fit">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-primary">{playlist.name}</h2>
                        <p className="text-sm text-primary">
                            {playlist.videos.length} videos
                        </p>
                    </div>
                    <Button
                        color={'red'}
                        onClick={() => handleDeletePlaylist(playlist.id)}
                    >
                        Delete Playlist
                    </Button>
                </div>

                <div className="grid gap-4">
                    {playlist.videos.map(video => (
                        <div
                            key={video.id}
                            className="flex gap-3 items-center bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => onVideoSelect(video.id)}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-32 h-20 object-cover rounded"
                            />
                            <div className="flex-1 justify-start h-full">
                                <h3 className="font-medium text-primary">{video.title}</h3>
                                <p className="text-sm text-primary">
                                    {video.channelTitle}
                                </p>
                            </div>
                            <Button
                                color={'red'}
                                onClick={(e) => handleRemoveVideo(e, playlist.id, video.id)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const tabs = playlists.map(playlist => ({
        title: playlist.name,
        value: playlist.id,
        content: <PlaylistContent playlist={playlist} />
    }));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Playlists</h1>
            {playlists.length > 0 ? (
                <Tabs tabs={tabs} />
            ) : (
                <p>No playlists yet</p>
            )}
        </div>
    );
}