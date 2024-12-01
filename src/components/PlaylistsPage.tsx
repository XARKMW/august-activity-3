import { useState, useEffect } from 'react';
import { Playlist } from '../types/playlist';
import { getPlaylists, deletePlaylist, removeVideoFromPlaylist } from '../utils/playlist';
import { Tabs } from "../ui/Tabs";
import { Button } from "@/ui/button.tsx";
import { motion, AnimatePresence } from 'framer-motion';

interface PlaylistsPageProps {
    onVideoSelect: (videoId: string) => void;
}

export default function PlaylistsPage({ onVideoSelect }: PlaylistsPageProps) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [activePlaylist, setActivePlaylist] = useState<string | null>(null);

    useEffect(() => {
        const loadedPlaylists = getPlaylists();
        setPlaylists(loadedPlaylists);
        if (loadedPlaylists.length > 0 && !activePlaylist) {
            setActivePlaylist(loadedPlaylists[0].id);
        }
    }, []);

    const handleDeletePlaylist = (playlistId: string) => {
        deletePlaylist(playlistId);
        // Update active playlist if we're deleting the current one
        if (activePlaylist === playlistId) {
            const remainingPlaylists = playlists.filter(p => p.id !== playlistId);
            setActivePlaylist(remainingPlaylists.length > 0 ? remainingPlaylists[0].id : null);
        }
        setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    };

    const handleRemoveVideo = async (e: React.MouseEvent, playlistId: string, videoId: string) => {
        e.stopPropagation();
        removeVideoFromPlaylist(playlistId, videoId);
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    videos: playlist.videos.filter(v => v.id !== videoId)
                };
            }
            return playlist;
        }));
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

                <AnimatePresence mode="popLayout" initial={false}>
                    <div className="grid gap-4">
                        {playlist.videos.map(video => (
                            <motion.div
                                key={video.id}
                                layoutId={video.id}
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: { duration: 0.2 }
                                }}
                                layout
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
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
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
            <AnimatePresence mode="popLayout" initial={false}>
                {playlists.length > 0 ? (
                    <motion.div
                        key="playlists"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Tabs
                            tabs={tabs}
                            activeTab={activePlaylist}
                            onTabChange={setActivePlaylist}
                        />
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-playlists"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        No playlists yet
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}