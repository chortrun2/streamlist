import React from 'react';

function About() {
  const containerStyle = {
    padding: '35px',
    backgroundColor: '#0c1021',
    borderRadius: '14px',
    border: '1px solid #1e293b',
    color: '#ffffff',
    maxWidth: '1150px',
    margin: '30px auto',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  };

  const headerStyle = {
    color: '#38bdf8',
    borderBottom: '2px solid #1e293b',
    paddingBottom: '14px',
    marginBottom: '24px',
    fontSize: '2.2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  };

  const sectionStyle = {
    marginBottom: '28px',
    lineHeight: '1.7',
    color: '#cbd5e1'
  };

  const subHeaderStyle = {
    color: '#f8fafc',
    marginBottom: '10px',
    fontSize: '1.25rem',
    fontWeight: '600'
  };

  // Clickable Tech Badge Style with Hover interactivity
  const linkBadgeStyle = {
    display: 'inline-block',
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    padding: '8px 16px',
    borderRadius: '8px',
    marginRight: '12px',
    marginBottom: '10px',
    fontSize: '0.95rem',
    fontWeight: '500',
    textDecoration: 'none',
    border: '1px solid #334155',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer'
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '15px'
  };

  const cardStyle = {
    backgroundColor: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>About EZTechMovie StreamList</h1>
      
      <div style={sectionStyle}>
        <h2 style={subHeaderStyle}>Executive Project Summary</h2>
        <p>
          <strong>EZTechMovie StreamList</strong> is an enterprise-grade Progressive Web Application (PWA) 
          engineered to provide users with seamless movie exploration, real-time title search via live external APIs, 
          genre filtering, and dynamic shopping cart synchronization. Developed as the capstone deliverable for the 
          INT 499 Information Technology curriculum at the University of Arizona Global Campus, this platform merges 
          responsive modern component architecture, client-side data persistence, strict PCI DSS payment security compliance, 
          and robust offline accessibility through service worker caching.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={subHeaderStyle}>Core Technical Capabilities</h2>
        <div style={cardGridStyle}>
          <div style={cardStyle}>
            <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '8px' }}>🎬 Live TMDB Integration</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Fetches live movie data, posters, and metadata directly from The Movie Database REST API with dynamic search and genre filtering.</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '8px' }}>🛒 StreamList Cart Persistence</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Utilizes the browser's LocalStorage API to maintain shopping cart state across sessions without data loss during navigation.</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '8px' }}>🔒 PCI DSS Security UI</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Incorporates data minimization and secure tokenized payment structures to safeguard sensitive credit card information.</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '8px' }}>⚡ PWA Offline Caching</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Implements custom service workers and Web App Manifest configurations for native desktop and mobile installation.</p>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={subHeaderStyle}>Interactive Technology Stack & References</h2>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '15px' }}>
          Click any technology badge below to explore official documentation and architectural standards:
        </p>
        <div>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            React Framework ↗
          </a>
          <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            React Router ↗
          </a>
          <a href="https://developer.themoviedb.org/docs" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            TMDB REST API ↗
          </a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            LocalStorage API ↗
          </a>
          <a href="https://web.dev/learn/pwa/" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            Service Workers & PWA ↗
          </a>
          <a href="https://www.pcisecuritystandards.org/" target="_blank" rel="noopener noreferrer" style={linkBadgeStyle}>
            PCI DSS Standards ↗
          </a>
        </div>
      </div>

      <div style={{ marginTop: '35px', paddingTop: '20px', borderTop: '1px solid #1e293b', fontSize: '0.85rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>EZTechMovie Enterprise Capstone • Version 1.0.0</span>
        <span>Lead Developer: Charles Short • University of Arizona Global Campus</span>
      </div>
    </div>
  );
}

export default About;