import React, { useState } from 'react';

function App() {
  const [artistData, setArtistData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [error, setError] = useState(null);

  const testArtistId = '4tZwfgrHOc3mvqYlEYSvVi';
  const testPlaylistId = '2jTy5QwqWJ1ZUv2XeJPYbn';

  const getArtist = async () => {
    try {
      const response = await fetch(`http://localhost:8000/artist/${testArtistId}`);
      const data = await response.json();
      setArtistData(data);
      setError(null);
    } catch (err) {
      setError('Error fetching artist data');
      console.error(err);
    }
  };

  const getPlaylist = async () => {
    try {
      const response = await fetch(`http://localhost:8000/playlist/${testPlaylistId}`);
      const data = await response.json();
      setPlaylistData(data);
      setError(null);
    } catch (err) {
      setError('Error fetching playlist data');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>PlaylistDNA</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={getArtist} style={{ marginRight: '10px' }}>Get Artist Info</button>
        <button onClick={getPlaylist}>Get Playlist Info</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {artistData && (
        <div>
          <h2>{artistData.name}</h2>
          <p>Followers: {artistData.followers.total}</p>
          <p>Genres: {artistData.genres.join(', ')}</p>
          <p>Popularity: {artistData.popularity}</p>
        </div>
      )}

      {playlistData && (
        <div>
          <h2>Playlist Info</h2>
          <p>Name: {playlistData.name}</p>
          <p>Owner: {playlistData.owner.display_name}</p>
          <p>Tracks: {playlistData.tracks.total}</p>
          <p>Description: {playlistData.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;