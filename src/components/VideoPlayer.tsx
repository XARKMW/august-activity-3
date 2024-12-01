import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getVideoDetails } from '../api/youtube';
import type { YouTubeVideoDetails } from '../types/youtube';
import { Button } from '../ui/button';
import { PlaylistManager } from '../components/PlaylistManager';
import { Plus } from 'lucide-react';
import {Dialog} from "@/ui/dialog.tsx";

interface VideoPlayerProps {
    videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
    const [showPlaylistManager, setShowPlaylistManager] = useState(false);
    const { data: videoDetails, isLoading } = useQuery<YouTubeVideoDetails>({
        queryKey: ['video', videoId],
        queryFn: () => getVideoDetails(videoId),
        enabled: Boolean(videoId)
    });

    if (isLoading) return <div>Loading...</div>;

    const handleAddToPlaylist = () => {
        setShowPlaylistManager(true);
    };

    return (
        <div className="max-w-full">
            <div className="relative pt-[56.25%]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {videoDetails && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-bold">
                            {videoDetails.snippet.title}
                        </h1>
                        <Button
                            onClick={handleAddToPlaylist}
                            color={'blue'}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Playlist
                        </Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-600">
                            {videoDetails.snippet.channelTitle}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <span>{parseInt(videoDetails.statistics.viewCount).toLocaleString()} views</span>
                            <span>{parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes</span>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700 whitespace-pre-line">
                        {videoDetails.snippet.description}
                    </p>
                </div>
            )}

            <Dialog open={showPlaylistManager } onClose={() => setShowPlaylistManager(false)}>
                <PlaylistManager
                    video={{
                        kind: 'youtube#searchResult',
                        etag: '',
                        id: {
                            kind: 'youtube#video',
                            videoId: videoId
                        },
                        snippet: {
                            publishedAt: videoDetails!.snippet.publishedAt,
                            channelId: videoDetails!.snippet.channelId,
                            title: videoDetails!.snippet.title,
                            description: videoDetails!.snippet.description,
                            thumbnails: videoDetails!.snippet.thumbnails,
                            channelTitle: videoDetails!.snippet.channelTitle,
                            publishTime: videoDetails!.snippet.publishedAt
                        }
                    }}
                    onClose={() => setShowPlaylistManager(false)}
                />
        </Dialog>
        </div>
    );
}