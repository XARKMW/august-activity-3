import VideoSearch from "./components/VideoSearch"
import PlaylistsPage from "./components/PlaylistsPage"
import VideoPlayerPage from "./components/VideoPlayerPage"
import { useState } from "react";
import { Button } from "@/ui/button.tsx";

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
                    <div className="flex items-center h-16">
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => handlePageChange('search')}
                                outline
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => handlePageChange('playlists')}
                                outline
                            >
                                My Playlists
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
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