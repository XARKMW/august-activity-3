import VideoCard from "@/components/VideoCard.tsx";
import {YouTubeSearchResult} from "@/types/youtube.ts";
import {searchVideos} from "@/api/youtube.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import LoaderSpinnerModal from "@/ui/LoaderSpinner.tsx";

interface VideoSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onVideoSelect: (videoId: string) => void;
}

export default function VideoSearch({ searchTerm, onSearchChange, onVideoSelect }: VideoSearchProps) {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['videos', debouncedSearchTerm],
        queryFn: () => searchVideos(debouncedSearchTerm),
        enabled: Boolean(debouncedSearchTerm),
        staleTime: 1000 * 60 * 5
    });

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search videos..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            {isLoading && <LoaderSpinnerModal/>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {error instanceof Error && <div>Error: {error.message}</div>}

                {data?.items.map((video: YouTubeSearchResult) => (
                    <VideoCard
                        key={video.id.videoId}
                        video={video}
                        onClick={() => onVideoSelect(video.id.videoId)}
                    />
                ))}
            </div>
        </div>
    );
}