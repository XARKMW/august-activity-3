
export interface PlaylistVideo {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration?: string;
}

export interface Playlist {
    id: string;
    name: string;
    videos: PlaylistVideo[];
    createdAt: string;
    updatedAt: string;
}