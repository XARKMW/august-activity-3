import {useState} from "react";
import {Button} from "@/ui/button.tsx";
import {PlaylistManager} from "@/components/PlaylistManager.tsx";
import {YouTubeSearchResult} from "@/types/youtube.ts";

interface VideoCardProps {
    video: YouTubeSearchResult;
    onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
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
                <div className="flex-1 flex flex-col gap-2">
                    <h3
                        className="font-semibold line-clamp-2 text-sm cursor-pointer"
                        onClick={onClick}
                    >
                        {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                        {video.snippet.channelTitle}
                    </p>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPlaylistManager(true);
                        }}
                        color={'blue'}
                    >
                        Add to Playlist
                    </Button>
                </div>
            </div>

            {showPlaylistManager && (
                <PlaylistManager
                    video={video}
                    onClose={() => setShowPlaylistManager(false)}
                />
            )}
        </div>
        //todo make scroll bar inside not global
    );
}