import { useQuery } from '@tanstack/react-query';
import { getVideoDetails } from '../api/youtube';
import type { YouTubeVideoDetails } from '../types/youtube';

interface VideoPlayerProps {
    videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
    const { data: videoDetails, isLoading } = useQuery<YouTubeVideoDetails>({
        queryKey: ['video', videoId],
        queryFn: () => getVideoDetails(videoId),
        enabled: Boolean(videoId)
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-full">
            <div className="relative w-full pt-[56.25%]">
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
                    <h1 className="text-2xl font-bold">
                        {videoDetails.snippet.title}
                    </h1>
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
        </div>
    );
}