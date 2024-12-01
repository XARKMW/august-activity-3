import VideoPlayer from './VideoPlayer';
import { Button } from "@/ui/button.tsx";

interface VideoPlayerPageProps {
    videoId: string;
    onBack: () => void;
}

export default function VideoPlayerPage({ videoId, onBack }: VideoPlayerPageProps) {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Button onClick={onBack} outline>
                    ← Back to Search
                </Button>
            </div>
            <VideoPlayer videoId={videoId} />
        </div>
    );
}