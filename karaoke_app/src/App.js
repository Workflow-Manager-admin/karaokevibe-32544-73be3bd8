import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from './Home';
import SongList from './SongList';
import Contact from './Contact';

import SingMode from './SingMode';
import Recording from './Recording';
import VoiceFilters from './VoiceFilters';
import Playback from './Playback';
import SaveShare from './SaveShare';

/*
 * PUBLIC_INTERFACE: Main Application Container
 * Brand-colored, fixed, persistent navigation bar with links: Home, Song List, Contact.
 * Follows KaraokeVibe color constants (see App.css) and responsive flex layout.
 */
function App() {
  return (
    <Router>
      <div className="app">
        {/* Persistent Top Navigation Bar */}
        <nav className="navbar">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Brand/Logo Area */}
            <div className="logo" style={{ userSelect: 'none' }}>
              <span className="logo-symbol" role="img" aria-label="music-note">🎤</span>
              KaraokeVibe
            </div>
            {/* Navigation Links */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <NavLink 
                to="/"
                end
                className={({ isActive }) => isActive ? "btn btn-large" : "btn"}
                style={({ isActive }) => ({
                  background: isActive ? 'var(--accent)' : 'var(--primary)',
                  color: isActive ? 'var(--secondary)' : '#191414',
                  fontWeight: 700,
                  letterSpacing: '0.2px',
                  border: 'none',
                  boxShadow: isActive ? '0 4px 18px rgba(255,215,0,0.18)' : 'none'
                })}
                aria-label="Home page"
              >Home</NavLink>
              <NavLink 
                to="/songs"
                className={({ isActive }) => isActive ? "btn btn-large" : "btn"}
                style={({ isActive }) => ({
                  background: isActive ? 'var(--accent)' : 'var(--primary)',
                  color: isActive ? 'var(--secondary)' : '#191414',
                  fontWeight: 700,
                  letterSpacing: '0.2px',
                  border: 'none',
                  boxShadow: isActive ? '0 4px 18px rgba(255,215,0,0.18)' : 'none'
                })}
                aria-label="Song list"
              >Song List</NavLink>
              <NavLink 
                to="/contact"
                className={({ isActive }) => isActive ? "btn btn-large" : "btn"}
                style={({ isActive }) => ({
                  background: isActive ? 'var(--accent)' : 'var(--primary)',
                  color: isActive ? 'var(--secondary)' : '#191414',
                  fontWeight: 700,
                  letterSpacing: '0.2px',
                  border: 'none',
                  boxShadow: isActive ? '0 4px 18px rgba(255,215,0,0.18)' : 'none'
                })}
                aria-label="Contact page"
              >Contact</NavLink>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main>
          <div className="container" style={{ paddingTop: 100 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/songs" element={<SongList />} />
              <Route path="/sing/:songId" element={<SingMode />} />
              <Route path="/record" element={<Recording />} />
              <Route path="/filters" element={<VoiceFilters />} />
              <Route path="/playback" element={<Playback />} />
              <Route path="/save" element={<SaveShare />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;