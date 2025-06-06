import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Placeholder page components
function Home() {
  return (
    <div className="hero">
      <div className="subtitle">Welcome to KaraokeVibe</div>
      <h1 className="title">SingAlong App</h1>
      <div className="description">
        Enjoy singing along with your favorite songs, try voice filters, record your performance, and share the fun!
      </div>
      <button className="btn btn-large">Get Started</button>
    </div>
  );
}
function SongList() {
  return (
    <div className="hero">
      <div className="subtitle">Song List</div>
      <h1 className="title">Browse Songs</h1>
      <div className="description">
        This is where you will see the full karaoke song library.
      </div>
    </div>
  );
}
function Contact() {
  return (
    <div className="hero">
      <div className="subtitle">Contact</div>
      <h1 className="title">Get in Touch</h1>
      <div className="description">
        Have feedback or questions? Reach out to the KaraokeVibe team!
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> KaraokeVibe
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    'btn' + (isActive ? ' btn-large' : '')
                  }
                  end
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--accent)' : 'var(--primary)',
                    color: isActive ? 'var(--secondary)' : '#191414'
                  })}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/songs"
                  className={({ isActive }) =>
                    'btn' + (isActive ? ' btn-large' : '')
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--accent)' : 'var(--primary)',
                    color: isActive ? 'var(--secondary)' : '#191414'
                  })}
                >
                  Song List
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    'btn' + (isActive ? ' btn-large' : '')
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--accent)' : 'var(--primary)',
                    color: isActive ? 'var(--secondary)' : '#191414'
                  })}
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="container" style={{ paddingTop: 100 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/songs" element={<SongList />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;