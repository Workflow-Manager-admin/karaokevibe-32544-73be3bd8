import React from "react";

// PUBLIC_INTERFACE
/**
 * Home page - KaraokeVibe
 * Minimal layout with title.
 */
function Home() {
  return (
    <div className="hero">
      <div className="subtitle">Welcome to KaraokeVibe</div>
      <h1 className="title">SingAlong App</h1>
      <div className="description">
        Your fun karaoke journey starts here—browse songs, sing, record, and share!
      </div>
    </div>
  );
}

export default Home;
