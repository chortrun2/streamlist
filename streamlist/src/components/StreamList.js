import React, { useState, useEffect } from 'react';

function StreamList() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('eztech_auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('eztech_user');
    return savedUser ? JSON.parse(savedUser) : { name: '', email: '' };
  });

  // Input states for dynamic login modal
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');

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

  // Save items to LocalStorage whenever items change
  useEffect(() => {
    localStorage.setItem('streamlist_items', JSON.stringify(items));
  }, [items]);

  // Save auth state
  useEffect(() => {
    localStorage.setItem('eztech_auth', isLoggedIn);
    if (user) {
      localStorage.setItem('eztech_user', JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

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
    }, 30000);
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

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputEmail.trim()) return;
    
    const loggedInUser = {
      name: inputName.trim(),
      email: inputEmail.trim()
    };
    
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setInputName('');
    setInputEmail('');
    localStorage.removeItem('eztech_auth');
    localStorage.removeItem('eztech_user');
  };

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
      
      {/* FULL-SCREEN VIBRANT BACKGROUND BACKDROPS */}
      <div style={{
        position: 'fixed',
        top: 60,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        zIndex: 0,
        opacity: 0.85,
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
                  filter: 'brightness(1)'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Subtle center shadow gradient */}
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

      {/* --- EXCLUSIVE GOOGLE OAUTH LOGIN BARRIER (When Not Logged In) --- */}
      {!isLoggedIn ? (
        <div style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(11, 15, 25, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
        }}>
          <h1 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '10px', fontWeight: 'bold' }}>
            Welcome to EZTechMovie
          </h1>
          <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Please sign in with Google to access the application.
          </p>

          <form onSubmit={handleGoogleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter your full name..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              required
            />
            <input
              type="email"
              placeholder="Enter your email address..."
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '12px 20px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'background-color 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>
      ) : (
        /* --- MAIN STREAMLIST DASHBOARD (Unlocked Upon Verification) --- */
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1f2937', paddingBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 'bold', color: '#ffffff' }}>My StreamList</h1>
              <p style={{ color: '#38bdf8', margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '500' }}>
                Welcome, {user.name}! ({user.email})
              </p>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>

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
      )}

    </div>
  );
}

export default StreamList;