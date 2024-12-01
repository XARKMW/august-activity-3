import VideoSearch from "./components/VideoSearch"
import PlaylistsPage from "./components/PlaylistsPage"
import {useState} from "react";
import {Button} from "@/ui/button.tsx";
import {toast} from "@/ui/use-toast.ts";
import {ToastAction} from "@/ui/toast.tsx";
type Page = 'search' | 'playlists'

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('search')

    return (
        <div className="min-h-screen bg-gray-80">
            <nav className="bg-white border border-border mb-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16">
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => setCurrentPage('search')}
                                outline
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => setCurrentPage('playlists')}
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