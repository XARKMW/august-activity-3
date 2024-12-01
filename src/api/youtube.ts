import axios from 'axios';
import { YouTubeSearchResponse, YouTubeVideoDetails } from '../types/youtube';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: YOUTUBE_API_KEY
    }
});

export const searchVideos = async (query: string): Promise<YouTubeSearchResponse> => {
    const response = await youtube.get<YouTubeSearchResponse>('/search', {
        params: {
            q: query,
            type: 'video'
        }
    });
    return response.data;
};

export const getVideoDetails = async (videoId: string): Promise<YouTubeVideoDetails> => {
    const response = await youtube.get<{ items: YouTubeVideoDetails[] }>('/videos', {
        params: {
            part: 'snippet,statistics',
            id: videoId
        }
    });
    return response.data.items[0];
};