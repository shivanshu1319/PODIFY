import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter albums and songs based on search query
  const filteredAlbums = albumsData.filter((album) =>
    album.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery) {
      // Save the search query to recent searches
      setRecentSearches((prev) => {
        if (!prev.includes(searchQuery)) {
          return [searchQuery, ...prev].slice(0, 5); // Limit recent searches to 5
        }
        return prev;
      });
    }
  }, [searchQuery]);

  // Play the selected song
  const handlePlaySong = (songId) => {
    playWithId(songId);
  };

  // Clear the search input
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false); // Hide search box after clearing
  };

  // Simulate loading state for better UX
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500); // Simulate a delay for loading
    }
  }, [searchQuery]);

  return (
    <div className="w-[25%] h-full p-4 flex-col gap-6 text-white hidden lg:flex">
      {/* Sidebar Header */}
      <div className="bg-[#121212] h-[15%] rounded-lg shadow-lg p-4 flex flex-col justify-around">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#ffffff2b] p-2 rounded-lg transition-all"
        >
          <img className="w-6" src={assets.home_icon} alt="Home Icon" />
          <p className="font-bold text-lg">Home</p>
        </div>
        <div
          onClick={() => setShowSearch(!showSearch)} // Toggle search input visibility
          className="flex items-center gap-3 cursor-pointer hover:bg-[#ffffff2b] p-2 rounded-lg transition-all"
        >
          <img className="w-6" src={assets.search_icon} alt="Search Icon" />
          <p className="font-bold text-lg">Search</p>
        </div>
      </div>

      {/* Search Input Section - Conditional Rendering */}
      {showSearch && (
        <div className="bg-[#121212] rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search albums or songs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-[#242424] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
            />
            <button
              onClick={handleClearSearch}
              className="text-[#1DB954] font-bold hover:text-white transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-t-4 border-[#1DB954] border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Search Results for Albums */}
      {showSearch && !loading && (
        <div className="bg-[#121212] rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Albums ({filteredAlbums.length})
          </h2>
          <div className="mt-2">
            {filteredAlbums.map((album, index) => (
              <div
                key={index}
                onClick={() => navigate(`/album/${album._id}`)}
                className="flex items-center gap-4 p-3 cursor-pointer hover:bg-[#ffffff2b] rounded-lg transition-all"
              >
                <img className="w-12 h-12 rounded-md" src={album.image} alt={album.name} />
                <p className="text-lg font-medium">{album.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results for Songs */}
      {showSearch && !loading && (
        <div className="bg-[#121212] rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Songs ({filteredSongs.length})
          </h2>
          <div className="mt-2">
            {filteredSongs.map((song, index) => (
              <div
                key={index}
                onClick={() => handlePlaySong(song._id)} // Play the song when clicked
                className="flex items-center gap-4 p-3 cursor-pointer hover:bg-[#ffffff2b] rounded-lg transition-all"
              >
                <img className="w-12 h-12 rounded-md" src={song.image} alt={song.name} />
                <p className="text-lg font-medium">{song.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {/* {showSearch && !loading && recentSearches.length > 0 && (
        <div className="bg-[#121212] rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
          <div className="mt-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                onClick={() => setSearchQuery(search)} // Set search query to recent search
                className="flex items-center gap-4 p-3 cursor-pointer hover:bg-[#ffffff2b] rounded-lg transition-all"
              >
                <p className="text-lg font-medium">{search}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
