import {useState} from "react";
import {Button} from "@/ui/button.tsx";
import {PlaylistManager} from "@/components/PlaylistManager.tsx";
import {YouTubeSearchResult} from "@/types/youtube.ts";
import {Dialog} from "@/ui/dialog.tsx";
import { Plus } from 'lucide-react';

interface VideoCardProps {
    video: YouTubeSearchResult;
    onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
    const [showPlaylistManager, setShowPlaylistManager] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-border overflow-hidden ">
            <div className="flex flew-row gap-3 p-2 h-32">
                <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="h-full object-cover rounded cursor-pointer"
                    onClick={onClick}
                />
                <div className="flex-1 flex flex-col gap-2 justify-evenly">
                    <div>
                        <h3
                            className="font-semibold line-clamp-2 text-sm cursor-pointer"
                            onClick={onClick}
                        >
                            {video.snippet.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                            {video.snippet.channelTitle}
                        </p>
                    </div>

                    <Button className={'flex '}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPlaylistManager(true);
                            }}
                            outline
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Playlist
                    </Button>
                </div>
            </div>

            <Dialog open={showPlaylistManager} onClose={() => setShowPlaylistManager(false)}>
                <PlaylistManager
                    video={video}
                    onClose={() => setShowPlaylistManager(false)}
                />
            </Dialog>

            {/*{showPlaylistManager && (*/}
            {/*    <PlaylistManager*/}
            {/*        video={video}*/}
            {/*        onClose={() => setShowPlaylistManager(false)}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
}