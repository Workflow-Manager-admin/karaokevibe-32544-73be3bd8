import React from "react";

// PUBLIC_INTERFACE
/**
 * Song List page - KaraokeVibe
 * Minimal layout with title.
 */
function SongList() {
  return (
    <div className="hero">
      <div className="subtitle">Song List</div>
      <h1 className="title">Browse Songs</h1>
      <div className="description">
        A full library of karaoke songs will appear here.
      </div>
    </div>
  );
}

export default SongList;
