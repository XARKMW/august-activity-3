// src/types/youtube.ts
export interface YouTubeVideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
    };
    channelTitle: string;
    publishTime: string;
}

export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YouTubeSearchResult {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: YouTubeVideoSnippet;
}

export interface YouTubeSearchResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeSearchResult[];
}

export interface YouTubeVideoStatistics {
    viewCount: string;
    likeCount: string;
    commentCount: string;
}

export interface YouTubeVideoDetails {
    kind: string;
    etag: string;
    id: string;
    snippet: YouTubeVideoSnippet;
    statistics: YouTubeVideoStatistics;
}