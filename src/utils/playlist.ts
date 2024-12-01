// src/utils/playlist.ts
import { Playlist, PlaylistVideo } from '../types/playlist';
import { YouTubeSearchResult } from '../types/youtube';

const PLAYLISTS_KEY = 'youtube_playlists';

export const getPlaylists = (): Playlist[] => {
    const playlists = localStorage.getItem(PLAYLISTS_KEY);
    return playlists ? JSON.parse(playlists) : [];
};

export const createPlaylist = (name: string): Playlist => {
    const playlists = getPlaylists();
    const newPlaylist: Playlist = {
        id: crypto.randomUUID(),
        name,
        videos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify([...playlists, newPlaylist]));
    return newPlaylist;
};

export const addVideoToPlaylist = (playlistId: string, video: YouTubeSearchResult): void => {
    const playlists = getPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);

    if (playlistIndex !== -1) {
        const playlistVideo: PlaylistVideo = {
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url,
            channelTitle: video.snippet.channelTitle,
        };

        playlists[playlistIndex].videos.push(playlistVideo);
        playlists[playlistIndex].updatedAt = new Date().toISOString();
        localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
    }
};

export const removeVideoFromPlaylist = (playlistId: string, videoId: string): void => {
    const playlists = getPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);

    if (playlistIndex !== -1) {
        playlists[playlistIndex].videos = playlists[playlistIndex].videos.filter(
            v => v.id !== videoId
        );
        playlists[playlistIndex].updatedAt = new Date().toISOString();
        localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
    }
};

export const deletePlaylist = (playlistId: string): void => {
    const playlists = getPlaylists();
    localStorage.setItem(
        PLAYLISTS_KEY,
        JSON.stringify(playlists.filter(p => p.id !== playlistId))
    );
};