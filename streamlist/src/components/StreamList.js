import React, { useState, useEffect } from 'react';

function StreamList() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('streamlist_items');
    return saved ? JSON.parse(saved) : ['Interstellar'];
  });
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // States for the rotating background backdrops
  const [backdropMovies, setBackdropMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Save to LocalStorage whenever items change
  useEffect(() => {
    localStorage.setItem('streamlist_items', JSON.stringify(items));
  }, [items]);

  // Fetch TMDB movies with backdrop images for the background
  useEffect(() => {
    const API_KEY = '6a159eca6f7a6918dc3f14d0d77ae99f';
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          const withBackdrops = data.results.filter(movie => movie.backdrop_path);
          setBackdropMovies(withBackdrops);
        }
      })
      .catch(err => console.error('Error fetching backdrop movies:', err));
  }, []);

  // Timer to rotate the background images every 30 seconds
  useEffect(() => {
    if (backdropMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backdropMovies.length);
    }, 30000); // 30 seconds interval
    return () => clearInterval(interval);
  }, [backdropMovies]);

  // Get 3 backdrop images for Left, Center, and Right background positioning
  const getVisibleBackdrops = () => {
    if (backdropMovies.length === 0) return [];
    const left = backdropMovies[currentIndex % backdropMovies.length];
    const center = backdropMovies[(currentIndex + 1) % backdropMovies.length];
    const right = backdropMovies[(currentIndex + 2) % backdropMovies.length];
    return [left, center, right];
  };

  const backdrops = getVisibleBackdrops();

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setItems([...items, inputValue.trim()]);
    setInputValue('');
  };

  const handleDeleteItem = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const handleStartEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditingText(currentText);
  };

  const handleSaveEdit = (indexToEdit) => {
    const updated = [...items];
    updated[indexToEdit] = editingText;
    setItems(updated);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: 'calc(100vh - 60px)', 
      width: '100vw',
      backgroundColor: '#050811', 
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      
      {/* FULL-SCREEN VIBRANT BACKGROUND BACKDROPS (Zero dimming, no boxes) */}
      <div style={{
        position: 'fixed',
        top: 60,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        zIndex: 0,
        opacity: 0.85, // Highly visible background art
        pointerEvents: 'none'
      }}>
        {backdrops.map((movie, idx) => (
          <div key={idx} style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            {movie && movie.backdrop_path && (
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                alt="Background Backdrop"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(1)' // Full, vibrant color representation
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Subtle center shadow gradient ONLY behind the text box so it remains readable */}
      <div style={{
        position: 'fixed',
        top: 60,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 60px)',
        background: 'radial-gradient(circle, rgba(5,8,17,0.3) 10%, rgba(5,8,17,0.75) 80%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* FOREGROUND: Main StreamList Box Centered */}
      <div style={{ 
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(11, 15, 25, 0.95)', 
        backdropFilter: 'blur(10px)',
        padding: '2.5rem', 
        borderRadius: '12px', 
        border: '1px solid rgba(255, 255, 255, 0.15)',
        width: '100%',
        maxWidth: '650px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
      }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ffffff' }}>My StreamList</h1>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Add titles you want to watch to your personal EZTechMovie cloud list.
        </p>

        <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Enter a movie or program name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.25rem',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span className="material-icons" style={{ fontSize: '1.2rem' }}>add</span> Add to List
          </button>
        </form>

        {/* List items with LocalStorage persistence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1f2937',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                border: '1px solid #374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {editingIndex === index ? (
                <div style={{ display: 'flex', flex: 1, gap: '0.5rem', marginRight: '1rem' }}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      backgroundColor: '#111827',
                      border: '1px solid #4b5563',
                      color: '#fff',
                      borderRadius: '4px'
                    }}
                  />
                  <button
                    onClick={() => handleSaveEdit(index)}
                    style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '1rem', color: '#f3f4f6' }}>{item}</span>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {editingIndex !== index && (
                  <button
                    onClick={() => handleStartEdit(index, item)}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                    title="Edit"
                  >
                    <span className="material-icons" style={{ fontSize: '1.1rem' }}>edit</span>
                  </button>
                )}
                <button
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                  title="Select"
                >
                  <span className="material-icons" style={{ fontSize: '1.1rem' }}>check_box_outline_blank</span>
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  title="Delete"
                >
                  <span className="material-icons" style={{ fontSize: '1.1rem' }}>delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default StreamList;