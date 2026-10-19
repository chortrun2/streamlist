import React, { useState, useEffect } from 'react';

function StreamList() {
  const [inputText, setInputText] = useState('');
  
  // Initialize streamList from localStorage, or fall back to default if empty
  const [streamList, setStreamList] = useState(() => {
    const savedList = localStorage.getItem('streamList');
    return savedList ? JSON.parse(savedList) : [
      { id: 1, title: 'Interstellar', completed: false }
    ];
  });

  // Save to localStorage whenever streamList changes
  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streamList));
  }, [streamList]);

  // Edit State Management
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Handle adding a new movie/show to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Log input to console per assignment specifications
    console.log("StreamList User Input:", inputText);

    const newItem = {
      id: Date.now(),
      title: inputText,
      completed: false,
    };

    setStreamList([...streamList, newItem]);
    setInputText(''); // Clears input automatically
  };

  // Handle deleting an item
  const handleDelete = (id) => {
    setStreamList(streamList.filter((item) => item.id !== id));
  };

  // Handle toggling completed status
  const handleToggleComplete = (id) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handle editing mode
  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const saveEdit = (id) => {
    setStreamList(
      streamList.map((item) =>
        item.id === id ? { ...item, title: editText } : item
      )
    );
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="page-container">
      <h1>My StreamList</h1>
      <p>Add titles you want to watch to your personal EZTechMovie cloud list.</p>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="streamlist-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a movie or program name..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-submit">
            <span className="material-icons">add</span> Add to List
          </button>
        </div>
      </form>

      {/* Render Movies List */}
      <div style={{ marginTop: '2rem' }}>
        {streamList.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>Your list is currently empty. Add a movie above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {streamList.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#0f172a',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '6px',
                  borderLeft: item.completed ? '4px solid #4ade80' : '4px solid #3a86ff',
                  opacity: item.completed ? 0.6 : 1,
                }}
              >
                {editingId === item.id ? (
                  <input
                    type="text"
                    className="input-field"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                ) : (
                  <span
                    style={{
                      flex: 1,
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: '#ffffff'
                    }}
                  >
                    {item.title}
                  </span>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* Edit / Save Button */}
                  {editingId === item.id ? (
                    <button 
                      onClick={() => saveEdit(item.id)}
                      style={{ background: 'none', border: 'none', color: '#3a86ff', cursor: 'pointer' }}
                    >
                      <span className="material-icons">save</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => startEditing(item.id, item.title)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    >
                      <span className="material-icons">edit</span>
                    </button>
                  )}

                  {/* Complete Checkbox Button */}
                  <button 
                    onClick={() => handleToggleComplete(item.id)}
                    style={{ background: 'none', border: 'none', color: item.completed ? '#4ade80' : '#94a3b8', cursor: 'pointer' }}
                  >
                    <span className="material-icons">
                      {item.completed ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StreamList;