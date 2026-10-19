import React, { useState, useEffect } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // TMDB Genre ID mapping
  const genres = [
    { id: 'All', name: 'All Movies' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 80, name: 'Crime' },
    { id: 16, name: 'Animation' },
    { id: 14, name: 'Fantasy' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10751, name: 'Family' },
    { id: 99, name: 'Documentary' }
  ];

  useEffect(() => {
    const API_KEY = '6a159eca6f7a6918dc3f14d0d77ae99f';
    setLoading(true);

    let url = '';

    if (searchQuery.trim() !== '') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`;
    } else if (selectedGenre === 'All') {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=en-US&page=1`;
    }

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
  }, [selectedGenre, searchQuery]);

  return (
    <div style={{ 
      margin: 0,
      padding: '2rem 4vw', // Fluid horizontal padding so it touches the screen edges smoothly
      color: '#ffffff', 
      backgroundColor: '#050811', 
      minHeight: 'calc(100vh - 60px)',
      width: '100vw',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Header Info */}
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>Movies and Series</h1>
      <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '1rem' }}>
        Explore categories or search for specific movies fetched live from The Movie Database.
      </p>

      {/* Search Input Box */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search movies by title (e.g., Avengers, Interstellar)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '450px',
            padding: '0.75rem 1rem',
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '6px',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Genre Category Links/Buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.6rem', 
        marginBottom: '2.5rem',
        borderBottom: '1px solid #1f2937',
        paddingBottom: '1.2rem',
        width: '100%'
      }}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              setSearchQuery('');
            }}
            style={{
              backgroundColor: selectedGenre === genre.id && searchQuery === '' ? '#3b82f6' : '#111827',
              color: '#ffffff',
              border: selectedGenre === genre.id && searchQuery === '' ? '1px solid #3b82f6' : '1px solid #374151',
              padding: '0.55rem 1.1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: selectedGenre === genre.id && searchQuery === '' ? '600' : 'normal',
              transition: 'background-color 0.2s'
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Edge-to-Edge Movie Grid */}
      {loading ? (
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#9ca3af' }}>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p style={{ marginTop: '2rem', color: '#9ca3af' }}>No movies found matching your criteria.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
          gap: '1.75rem',
          width: '100%'
        }}>
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              style={{ 
                backgroundColor: '#111827', 
                padding: '1rem', 
                borderRadius: '10px', 
                border: '1px solid #1f2937',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s ease',
              }}
            >
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.75rem' }}
                />
              ) : (
                <div style={{ height: '300px', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', borderRadius: '6px', color: '#9ca3af' }}>
                  No Image Available
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {movie.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Release: {movie.release_date || 'TBA'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;