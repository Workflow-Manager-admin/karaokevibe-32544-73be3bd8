import React from "react";

// PUBLIC_INTERFACE
/**
 * Song List page - KaraokeVibe
 * Displays a stub library of songs. Each has a "Sing" button routing to SingMode for that song.
 */
import { useNavigate } from "react-router-dom";

function SongList() {
  const navigate = useNavigate();
  // Demo song list (stubbed)
  const demoSongs = [
    { id: 1, title: "Shallow", artist: "Lady Gaga, Bradley Cooper" },
    { id: 2, title: "Let It Go", artist: "Idina Menzel" },
    { id: 3, title: "Bohemian Rhapsody", artist: "Queen" },
  ];

  return (
    <div className="hero">
      <div className="subtitle">Song List</div>
      <h1 className="title">Browse Songs</h1>
      <div className="description" style={{ marginBottom: 24 }}>
        Choose a song and click <b>Sing</b> to start your karaoke journey!
      </div>
      <div
        className="container"
        style={{
          background: "rgba(0,0,0,0.12)",
          borderRadius: 10,
          maxWidth: 450,
          padding: 24,
          margin: "0 auto",
        }}
      >
        {demoSongs.map((song) => (
          <div
            key={song.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border-color)",
              padding: "12px 0",
              gap: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{song.title}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.95em" }}>{song.artist}</div>
            </div>
            <button
              className="btn"
              style={{ minWidth: 80 }}
              onClick={() => navigate(`/sing/${song.id}`)}
              aria-label={`Sing ${song.title}`}
            >
              Sing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongList;
