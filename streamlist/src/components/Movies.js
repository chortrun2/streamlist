import React, { useState, useEffect } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = '6a159eca6f7a6918dc3f14d0d77ae99f';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching TMDB data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container" style={{ padding: '2rem', color: '#ffffff', backgroundColor: '#090d16', minHeight: '100vh' }}>
      <h1>TMDB Movie Explorer</h1>
      <p style={{ color: '#94a3b8' }}>Discover trending movies fetched live from The Movie Database API.</p>

      {loading ? (
        <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>Loading live movies from TMDB...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginTop: '2rem' 
        }}>
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              style={{ 
                backgroundColor: '#0f172a', 
                padding: '1rem', 
                borderRadius: '8px', 
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '4px', marginBottom: '0.75rem' }}
                />
              ) : (
                <div style={{ height: '280px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', borderRadius: '4px' }}>
                  No Image Available
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#ffffff' }}>{movie.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Release: {movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;