// src/components/VideoSearch.tsx
import { useQuery } from '@tanstack/react-query';
import { searchVideos } from '../api/youtube';
import { FormEvent, useState } from 'react';
import { YouTubeSearchResult } from '../types/youtube';
import VideoPlayer from './VideoPlayer';
import {PlaylistManager} from "./PlaylistManager.tsx";

export default function VideoSearch() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['videos', searchTerm],
        queryFn: () => searchVideos(searchTerm),
        enabled: Boolean(searchTerm),
        staleTime: 1000 * 60 * 5
    });

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;
        if (searchValue) setSearchTerm(searchValue);
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search videos..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area */}
                <div className="lg:col-span-2">
                    {selectedVideo ? (
                        <VideoPlayer videoId={selectedVideo} />
                    ) : (
                        <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
                            <p className="text-gray-500">Search and select a video to play</p>
                        </div>
                    )}
                </div>

                {/* Video list sidebar */}
                <div className="lg:col-span-1">
                    {isLoading && <div>Loading...</div>}
                    {error instanceof Error && <div>Error: {error.message}</div>}

                    <div className="flex flex-col gap-4">
                        {data?.items.map((video: YouTubeSearchResult) => (
                            <VideoCard
                                key={video.id.videoId}
                                video={video}
                                onClick={() => setSelectedVideo(video.id.videoId)}
                                isSelected={selectedVideo === video.id.videoId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface VideoCardProps {
    video: YouTubeSearchResult;
    onClick: () => void;
    isSelected: boolean;
}

function VideoCard({ video, onClick, isSelected }: VideoCardProps) {
    const [showPlaylistManager, setShowPlaylistManager] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex gap-3 p-2">
                <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-40 h-24 object-cover rounded cursor-pointer"
                    onClick={onClick}
                />
                <div className="flex-1">
                    <h3
                        className="font-semibold line-clamp-2 text-sm cursor-pointer"
                        onClick={onClick}
                    >
                        {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                        {video.snippet.channelTitle}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPlaylistManager(true);
                        }}
                        className="mt-2 text-sm px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add to Playlist
                    </button>
                </div>
            </div>

            {showPlaylistManager && (
                <PlaylistManager
                    video={video}
                    onClose={() => setShowPlaylistManager(false)}
                />
            )}
        </div>
    );
}