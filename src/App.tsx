import VideoSearch from "./components/VideoSearch"
import PlaylistsPage from "./components/PlaylistsPage"
import VideoPlayerPage from "./components/VideoPlayerPage"
import { useState } from "react";
import {Tabs, TabsList, TabsTrigger} from "@/ui/ShadTabs.tsx";

type Page = 'search' | 'playlists' | 'player'

interface PageState {
    type: Page;
    data?: {
        videoId?: string;
    };
}

function App() {
    const [currentPage, setCurrentPage] = useState<PageState>({ type: 'search' });
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handlePageChange = (page: Page) => {
        setCurrentPage({ type: page });
    };

    return (
        <div className="min-h-screen bg-gray-80">
            <nav className="bg-white border border-border mb-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-16">
                        <Tabs
                            value={currentPage.type}
                            onValueChange={handlePageChange}
                            className="w-full max-w-[400px]"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="search">Search</TabsTrigger>
                                <TabsTrigger value="playlists">My Playlists</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4">
                {currentPage.type === 'search' && (
                    <VideoSearch
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onVideoSelect={(videoId) =>
                            setCurrentPage({ type: 'player', data: { videoId } })
                        }
                    />
                )}
                {currentPage.type === 'playlists' && (
                    <PlaylistsPage onVideoSelect={(videoId) =>
                        setCurrentPage({ type: 'player', data: { videoId } })
                    }/>
                )}
                {currentPage.type === 'player' && currentPage.data?.videoId && (
                    <VideoPlayerPage
                        videoId={currentPage.data.videoId}
                        onBack={() => setCurrentPage({ type: 'search' })}
                    />
                )}
            </main>
        </div>
    )
}

export default App