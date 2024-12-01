import { useState } from 'react';
import { YouTubeSearchResult } from '../types/youtube';
import { Playlist } from '../types/playlist';
import { createPlaylist, addVideoToPlaylist, getPlaylists, deletePlaylist, removeVideoFromPlaylist } from '../utils/playlist';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import {Button} from "@/ui/button.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface PlaylistManagerProps {
    video: YouTubeSearchResult;
    onClose: () => void;
}

export function PlaylistManager({ video, onClose }: PlaylistManagerProps) {
    const [playlists, setPlaylists] = useState<Playlist[]>(getPlaylists);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const { toast } = useToast();

    const handleCreatePlaylist = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            const newPlaylist = createPlaylist(newPlaylistName.trim());
            setPlaylists([...playlists, newPlaylist]);
            setNewPlaylistName('');
            setIsCreating(false);

            toast({
                title: `Playlist Created: ${newPlaylistName}`,
                description: new Date().toLocaleString(),
                action: (
                    <ToastAction
                        altText="Undo playlist creation"
                        onClick={() => {
                            deletePlaylist(newPlaylist.id);
                            setPlaylists(getPlaylists());
                        }}
                    >
                        Undo
                    </ToastAction>
                ),
            });
        }
    };

    const handleAddToPlaylist = (playlistId: string) => {
        const playlist = playlists.find(p => p.id === playlistId);
        addVideoToPlaylist(playlistId, video);
        setPlaylists(getPlaylists());
        onClose();

        if (playlist) {
            toast({
                title: `Added to: ${playlist.name}`,
                description: `Video "${video.snippet.title}" added to playlist`,
                action: (
                    <ToastAction
                        altText="Undo add to playlist"
                        onClick={() => {
                            removeVideoFromPlaylist(playlistId, video.id.videoId);
                            setPlaylists(getPlaylists());
                        }}
                    >
                        Undo
                    </ToastAction>
                ),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto flex-col gap-2 flex">
                <div className="flex justify-between items-center mb-2 ">
                    <h2 className="text-xl font-bold">Add to Playlist</h2>
                    <Button
                        plain
                        onClick={onClose}
                    >
                        <XMarkIcon className={'size-4'}/>
                    </Button>
                </div>

                {isCreating ? (
                    <form onSubmit={handleCreatePlaylist} className="mb-4">
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="New playlist name"
                            className="w-full px-3 py-2 border rounded-lg mb-2"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Button
                                base
                                type="submit"
                            >
                                Create
                            </Button>
                            <Button
                                color={'red'}
                                type="button"
                                onClick={() => setIsCreating(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="w-full"
                        color={'green'}
                    >
                        Create New Playlist
                    </Button>
                )}
                <div className="space-y-2">
                    {playlists.map(playlist => (
                        <Button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            outline
                            className={'w-full'}
                        >
                            <div>
                                <div className="font-medium">{playlist.name}</div>
                                <div className="text-sm text-gray-500">
                                    {playlist.videos.length} videos
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}