import VideoSearch from "./components/VideoSearch"
import PlaylistsPage from "./components/PlaylistsPage"
import {useState} from "react";
type Page = 'search' | 'playlists'

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('search')

    return (
        <div className="min-h-screen bg-gray-80">
            <nav className="bg-white shadow-md mb-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setCurrentPage('search')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === 'search'
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Search
                            </button>
                            <button
                                onClick={() => setCurrentPage('playlists')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === 'playlists'
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                My Playlists
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="container mx-auto px-4">
                {currentPage === 'search' ? (
                    <VideoSearch/>
                ) : (
                    <PlaylistsPage/>
                )}
            </main>
        </div>
    )
}

export default App