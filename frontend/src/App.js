import React, { useState } from 'react';

function App() {
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  const testArtistId = '4tZwfgrHOc3mvqYlEYSvVi';

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

  return (
    <div>
      <h1>PlaylistDNA</h1>
      <button onClick={getArtist}>Get Artist Info</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {artistData && (
        <div>
          <h2>{artistData.name}</h2>
          <p>Followers: {artistData.followers.total}</p>
          <p>Genres: {artistData.genres.join(', ')}</p>
          <p>Popularity: {artistData.popularity}</p>
        </div>
      )}
    </div>
  );
}

export default App;